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
    <table style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
      <tr>
        <td style="padding-bottom: 10px;">
          <strong>${data.firstName} ${data.lastName}</strong><br/>
          <span style="color: #666;">${data.designation}</span>
        </td>
      </tr>
      <tr>
        <td style="padding-bottom: 10px;">
          📞 <a href="tel:${data.contactNumber}" style="color: #333; text-decoration: none;">${data.contactNumber}</a>
        </td>
      </tr>
      <tr>
        <td style="padding-bottom: 10px;">
          ✉️ <a href="mailto:${data.email}" style="color: #333; text-decoration: none;">${data.email}</a>
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
}
