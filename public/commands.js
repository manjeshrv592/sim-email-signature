/* global Office */

Office.onReady(() => {
  console.log("Commands loaded successfully!");
});

// Insert Simtech signature button click handler
function insertSignature(event) {
  console.log("Insert Simtech button was clicked!");
  
  // Get the current email item
  const item = Office.context.mailbox.item;
  
  // The signature text to insert
  const signatureText = "Simtech signature inserted";
  
  // Get the current body content
  item.body.getAsync(Office.CoercionType.Html, function (result) {
    if (result.status === Office.AsyncResultStatus.Succeeded) {
      // Append the signature to the existing body
      const currentBody = result.value;
      const newBody = currentBody + "<br/><br/>" + signatureText;
      
      // Set the new body content
      item.body.setAsync(newBody, { coercionType: Office.CoercionType.Html }, function (setResult) {
        if (setResult.status === Office.AsyncResultStatus.Succeeded) {
          console.log('Signature inserted successfully');
          
          // Show a notification
          Office.context.mailbox.item.notificationMessages.addAsync("signatureNotification", {
            type: "informationalMessage",
            message: "Simtech signature inserted successfully! ✅",
            icon: "Icon.80x80",
            persistent: false
          });
        } else {
          console.error('Error inserting signature:', setResult.error.message);
        }
        
        // Signal that the command is complete
        event.completed();
      });
    } else {
      console.error('Error getting body:', result.error.message);
      event.completed();
    }
  });
}

// Register the function
Office.actions.associate("insertSignature", insertSignature);
