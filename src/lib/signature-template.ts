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
    <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, Helvetica, sans-serif">
      <tr>
        <td style="padding-right: 20px; vertical-align: middle;">
          <div>
            <div
              style="
                font-weight: bold;
                font-size: 20px;
                margin-bottom: 4px;
              "
            >
              ${data.firstName} ${data.lastName}
            </div>
            <div style="font-size: 14px; margin-bottom: 4px">
              ${data.designation}
            </div>
            <div style="font-size: 14px; color: #737373">
              Ph - ${data.contactNumber}
            </div>
          </div>
        </td>
        <td style="padding-left: 20px; vertical-align: top; border-left: 1px solid #d4d4d4;">
          <table cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
                <table cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="vertical-align: bottom;">
                      <div>
                        <img
                          src="https://sim-email-signature.vercel.app/simtech-logo.png"
                          alt="Simtech Logo"
                          style="height: 56px; width: auto; display: block"
                        />
                      </div>
                      <div
                        style="
                          font-size: 14px;
                          padding-left: 26px;
                          margin-top: -8px;
                        "
                      >
                        Gopalan Signature Tower
                      </div>
                    </td>
                    <td style="vertical-align: bottom; padding-left: 48px;">
                      <img
                        src="https://sim-email-signature.vercel.app/iso-logo.png"
                        alt="ISO Logo"
                        height="64"
                        style="
                          height: 64px;
                          width: auto;
                          display: block;
                        "
                      />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <div style="padding-left: 27px; padding-top: 8px;">
                  <div style="font-size: 14px; margin-bottom: 4px">
                    3rd, Floor, No.6, Old Madras Road, Nagavarapalya,
                  </div>
                  <div style="font-size: 14px; margin-bottom: 4px">
                    C.V.Raman Nagar, Bangalore - 560093
                  </div>
                  <div style="font-size: 14px; margin-bottom: 4px">
                    Website -
                    <span style="font-weight: bold">
                      <a href="https://www.simtech.one" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;">www.simtech.one</a>
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}
