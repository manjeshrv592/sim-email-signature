import { getOfficeAddress } from './addresses';

interface SignatureData {
  firstName: string;
  lastName: string;
  designation: string;
  contactNumber: string;
  email: string;
  // Location fields for region-based signatures (future use)
  countryCode?: string | null;
  country?: string | null;
  usageLocation?: string | null;
  city?: string | null;
}

export function generateSignatureHtml(data: SignatureData): string {
  // Get office address based on user's country
  const address = getOfficeAddress(data.usageLocation);
  
  return `
    <br/><br/>
    <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, Helvetica, sans-serif">
      <tr>
        <td style="padding-right: 20px; vertical-align: middle;">
          <div>
            ${data.countryCode ? `
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <div style="width: 24px; height: 24px; border-radius: 50%; overflow: hidden; border: 1px solid #d4d4d4; display: inline-flex; align-items: center; justify-content: center;">
                  <img src="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/flags/${data.countryCode}.svg" alt="${data.country || 'Country'}" style="width: 24px; height: 24px; object-fit: cover;" />
                </div>
                <span style="font-size: 14px; color: #525252;">${data.country}</span>
              </div>
            ` : ''}
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
                        ${address.buildingName}
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
                    ${address.addressLine1}
                  </div>
                  <div style="font-size: 14px; margin-bottom: 4px">
                    ${address.addressLine2}
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
