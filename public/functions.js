// Office.js function file for Outlook add-in commands

(function () {
    "use strict";

    // The Office.onReady() function must be called before any other Office.js code
    Office.onReady(() => {
        console.log('Functions.js loaded');
    });

    // Register the function with the name used in manifest.xml
    Office.actions.associate("insertSignature", insertSignature);

    /**
     * Inserts the Simtech signature at the end of the email body
     * @param {Office.AddinCommands.Event} event - The event object from the add-in command
     */
    function insertSignature(event) {
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
                    } else {
                        console.error('Error inserting signature:', setResult.error.message);
                    }
                    
                    // IMPORTANT: Must call event.completed() to signal the command has finished
                    event.completed();
                });
            } else {
                console.error('Error getting body:', result.error.message);
                event.completed();
            }
        });
    }
})();
