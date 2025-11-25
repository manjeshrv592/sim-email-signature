/* global Office */

Office.onReady(() => {
  console.log("Commands loaded successfully!");
});

// Helper function to insert signature
function insertSignatureLogic(event, isAuto = false) {
  // Get the current email item
  const item = Office.context.mailbox.item;
  
  // The signature HTML to insert
  const signatureHtml = `
    <br/><br/>
    <table style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
      <tr>
        <td style="padding-bottom: 10px;">
          <strong>Manjesh R V</strong><br/>
          <span style="color: #666;">Associate Software Developer</span>
        </td>
      </tr>
      <tr>
        <td style="padding-bottom: 10px;">
          📞 <a href="tel:+919731400613" style="color: #333; text-decoration: none;">+91-9731400613</a>
        </td>
      </tr>
      <tr>
        <td style="padding-bottom: 15px;">
          <strong>Simtech IT Solutions Private Limited</strong><br/>
          <span style="font-size: 12px; color: #666;">
            Gopalan Signature Towers, No.6, 3rd Floor,<br/>
            Old Madras Road Nagavarapalya, C V Raman Nagar,<br/>
            Bengaluru - 560093, Karnataka, India
          </span>
        </td>
      </tr>
      <tr>
        <td>
          <img src="https://sim-email-signature.vercel.app/simtech-logo.png" alt="Simtech Logo" height="40" style="vertical-align: middle; margin-right: 15px;"/>
          <img src="https://sim-email-signature.vercel.app/iso-logo.png" alt="ISO Logo" height="40" style="vertical-align: middle;"/>
        </td>
      </tr>
    </table>
  `;
  
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
