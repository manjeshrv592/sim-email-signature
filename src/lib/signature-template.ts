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
    <table style="font-family: Arial, Helvetica, sans-serif">
      <tr>
        <td style="position: relative">
          <table>
            <tr>
              <td>
                <span
                  style="
                    position: absolute;
                    width: 1px;
                    height: 100%;
                    background-color: #d4d4d4;
                    top: 0;
                    right: 20px;
                  "
                ></span>
                <div style="padding-right: 50px">
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
            </tr>
          </table>
        </td>
        <td>
          <table>
            <tr>
              <td>
                <table>
                  <tr>
                    <td>
                      <span>
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
                      </span>
                    </td>
                    <td>
                      <span>
                        <img
                          src="https://sim-email-signature.vercel.app/iso-logo.png"
                          alt="ISO Logo"
                          height="64"
                          style="
                            height: 64px;
                            width: auto;
                            display: block;
                            margin-left: 48px;
                          "
                        />
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <div style="padding-left: 26px">
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
