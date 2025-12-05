import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/microsoft-graph";
import { generateSignatureHtml } from "@/lib/signature-template";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    // Fetch user from Microsoft Graph API (Azure AD)
    const user = await getUserByEmail(email.toLowerCase());

    let signatureData;

    if (!user) {
      // Fallback for users not in Azure AD
      console.log(`User ${email} not found in Azure AD, using fallback`);
      signatureData = {
        firstName: "Firstname",
        lastName: "Lastname",
        designation: "Designation",
        contactNumber: "Contact",
        email: email,
      };
    } else {
      // Map Azure AD fields to signature data
      signatureData = {
        firstName: user.givenName || "Firstname",
        lastName: user.surname || "Lastname",
        designation: user.jobTitle || "Designation",
        // Prefer mobilePhone, fallback to first business phone
        contactNumber: user.mobilePhone || user.businessPhones[0] || "Contact",
        email: user.mail || email,
        // Location fields for region-based signatures
        country: user.country,
        usageLocation: user.usageLocation,
        city: user.city,
      };
    }

    // Generate HTML signature
    const signatureHtml = generateSignatureHtml(signatureData);

    // Return HTML with proper content type
    return new NextResponse(signatureHtml, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    
    // Return fallback signature on error
    const email = request.nextUrl.searchParams.get("email") || "user@company.com";
    const fallbackSignatureData = {
      firstName: "User",
      lastName: "",
      designation: "Employee",
      contactNumber: "",
      email: email,
    };
    
    const fallbackHtml = generateSignatureHtml(fallbackSignatureData);
    
    return new NextResponse(fallbackHtml, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "no-cache",
      },
    });
  }
}
