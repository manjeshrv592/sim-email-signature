/* global Office */

Office.onReady(() => {
  console.log("Commands loaded successfully!");
});

// API endpoint for signatures
const API_BASE_URL = "https://sim-email-signature.vercel.app";

// Helper function to fetch signature from API
async function fetchSignature(userEmail) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/signature?email=${encodeURIComponent(userEmail)}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
      console.error("API Error:", errorData.error);
      return null;
    }
    
    const signatureHtml = await response.text();
    return signatureHtml;
  } catch (error) {
    console.error("Error fetching signature:", error);
    return null;
  }
}

// Helper function to insert signature
async function insertSignatureLogic(event, isAuto = false) {
  // Get the current email item
  const item = Office.context.mailbox.item;
  
  // Get user email
  const userEmail = Office.context.mailbox.userProfile.emailAddress;
  console.log("User email:", userEmail);
  
  // Fetch signature from API
  const signatureHtml = await fetchSignature(userEmail);
  
  if (!signatureHtml) {
    console.error("Failed to fetch signature");
    
    if (!isAuto) {
      // Show error notification for manual clicks
      Office.context.mailbox.item.notificationMessages.addAsync("signatureError", {
        type: "errorMessage",
        message: "Failed to load signature. Please try again or contact support.",
        icon: "Icon.80x80",
        persistent: false
      });
    }
    
    if (event) event.completed();
    return;
  }
  
  // Get the current body content
  item.body.getAsync(Office.CoercionType.Html, function (result) {
    if (result.status === Office.AsyncResultStatus.Succeeded) {
      // Append the signature to the existing body
      const currentBody = result.value;
      
      // Simple check to avoid duplicate insertion if running automatically
      // Checking for a unique part of the signature to detect presence
      if (isAuto && currentBody.includes("Simtech IT Solutions Private Limited")) {
        console.log("Signature already present, skipping auto-insertion.");
        if (event) event.completed();
        return;
      }

      const newBody = currentBody + signatureHtml;
      
      // Set the new body content
      item.body.setAsync(newBody, { coercionType: Office.CoercionType.Html }, function (setResult) {
        if (setResult.status === Office.AsyncResultStatus.Succeeded) {
          console.log('Signature inserted successfully');
          
          if (!isAuto) {
            // Show a notification only for manual clicks
            Office.context.mailbox.item.notificationMessages.addAsync("signatureNotification", {
              type: "informationalMessage",
              message: "Simtech signature inserted successfully! ✅",
              icon: "Icon.80x80",
              persistent: false
            });
          }
        } else {
          console.error('Error inserting signature:', setResult.error.message);
        }
        
        // Signal that the command is complete
        if (event) event.completed();
      });
    } else {
      console.error('Error getting body:', result.error.message);
      if (event) event.completed();
    }
  });
}

// Manual button click handler
function insertSignature(event) {
  console.log("Insert Simtech button was clicked!");
  insertSignatureLogic(event, false);
}

// Automatic event handler
function autoInsertSignature(event) {
  console.log("Auto-inserting signature...");
  insertSignatureLogic(event, true);
}

// Register the functions
Office.actions.associate("insertSignature", insertSignature);
Office.actions.associate("autoInsertSignature", autoInsertSignature);
