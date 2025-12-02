interface SignatureData {
  firstName: string;
  lastName: string;
  designation: string;
  contactNumber: string;
  email: string;
}

export function generateSignatureHtml(data: SignatureData): string {
  return `
    <br/><br/>
    <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; color: #111827; max-width: 600px;">
      <tr>
        <td style="vertical-align: top; padding-right: 24px;">
          <table cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
                <h3 style="margin: 0 0 4px 0; font-size: 24px; font-weight: 600; color: #111827;">${data.firstName} ${data.lastName}</h3>
              </td>
            </tr>
            <tr>
              <td>
                <h5 style="margin: 0 0 4px 0; font-size: 20px; font-weight: 400; color: #111827;">${data.designation}</h5>
              </td>
            </tr>
            <tr>
              <td>
                <span style="color: #6b7280;">Ph - ${data.contactNumber}</span>
              </td>
            </tr>
          </table>
        </td>
        <td style="width: 1px; background-color: #d1d5db; padding: 0;">&nbsp;</td>
        <td style="vertical-align: top; padding-left: 24px; font-size: 14px; line-height: 1.5;">
          <table cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="vertical-align: bottom; padding-right: 48px;">
                <table cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td>
                      <img src="https://sim-email-signature.vercel.app/simtech-logo.png" alt="Simtech Logo" height="56" style="height: 56px; width: auto; display: block; margin-bottom: 8px;" />
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-left: 36px;">
                      <span>Gopalan Signature Tower</span>
                    </td>
                  </tr>
                </table>
              </td>
              <td style="vertical-align: bottom;">
                <img src="https://sim-email-signature.vercel.app/iso-logo.png" alt="ISO Logo" height="64" style="height: 64px; width: auto; display: block;" />
              </td>
            </tr>
            <tr>
              <td colspan="2" style="padding-top: 8px; padding-left: 36px;">
                <span>3rd, Floor, No.6, Old Madras Road, Nagavarapalya,</span>
                <br />
                <span>C.V.Raman Nagar, Bangalore - 560093</span>
                <br />
                <span>Website - <span style="font-weight: 600;"><a href="https://www.simtech.one" target="_blank" rel="noopener noreferrer" style="color: #111827; text-decoration: none;">www.simtech.one</a></span></span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}
