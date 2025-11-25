/* global Office */

Office.onReady(() => {
  console.log("Commands loaded successfully!");
});

// Helper function to insert signature
function insertSignatureLogic(event, isAuto = false) {
  // Get the current email item
  const item = Office.context.mailbox.item;
  
  // The signature text to insert
  const signatureText = "Simtech signature inserted";
  
  // Get the current body content
  item.body.getAsync(Office.CoercionType.Html, function (result) {
    if (result.status === Office.AsyncResultStatus.Succeeded) {
      // Append the signature to the existing body
      const currentBody = result.value;
      
      // Simple check to avoid duplicate insertion if running automatically
      if (isAuto && currentBody.includes(signatureText)) {
        console.log("Signature already present, skipping auto-insertion.");
        if (event) event.completed();
        return;
      }

      const newBody = currentBody + "<br/><br/>" + signatureText;
      
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
