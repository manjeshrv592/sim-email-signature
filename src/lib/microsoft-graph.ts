/**
 * Microsoft Graph API Utility
 * Handles authentication and user data fetching from Azure AD
 */

interface GraphUser {
  businessPhones: string[];
  displayName: string;
  givenName: string | null;
  surname: string | null;
  jobTitle: string | null;
  mail: string;
  mobilePhone: string | null;
  officeLocation: string | null;
  userPrincipalName: string;
  id: string;
}

interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

// Token cache (in-memory, resets on server restart)
let cachedToken: string | null = null;
let tokenExpiresAt: number = 0;

/**
 * Get OAuth2 access token for Microsoft Graph API
 * Caches token for 50 minutes to avoid excessive token requests
 */
export async function getAccessToken(): Promise<string> {
  // Check if we have a valid cached token
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  const clientId = process.env.AZURE_AD_CLIENT_ID;
  const clientSecret = process.env.AZURE_AD_CLIENT_SECRET;
  const tenantId = process.env.AZURE_AD_TENANT_ID;

  if (!clientId || !clientSecret || !tenantId) {
    throw new Error('Missing Azure AD credentials in environment variables');
  }

  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials',
  });

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to get access token: ${errorData.error_description || response.statusText}`);
    }

    const data: AccessTokenResponse = await response.json();
    
    // Cache the token (expires in 60 minutes, cache for 50 to be safe)
    cachedToken = data.access_token;
    tokenExpiresAt = Date.now() + (50 * 60 * 1000); // 50 minutes

    return data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

/**
 * Fetch user profile data from Azure AD by email
 * @param email - User's email address
 * @returns User profile data or null if not found
 */
export async function getUserByEmail(email: string): Promise<GraphUser | null> {
  try {
    const accessToken = await getAccessToken();

    const userUrl = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(email)}`;

    const response = await fetch(userUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 404) {
      // User not found in Azure AD
      console.log(`User not found in Azure AD: ${email}`);
      return null;
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch user: ${errorData.error?.message || response.statusText}`);
    }

    const userData: GraphUser = await response.json();
    return userData;
  } catch (error) {
    console.error(`Error fetching user ${email}:`, error);
    throw error;
  }
}
