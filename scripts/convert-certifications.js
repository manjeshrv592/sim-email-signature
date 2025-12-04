const fs = require('fs');
const path = require('path');

const certifications = [
  { path: 'public/certifications/iso-27001.png', constant: 'ISO_27001_BASE64' },
  { path: 'public/certifications/iso-42001.png', constant: 'ISO_42001_BASE64' },
  { path: 'public/certifications/india/stpi.png', constant: 'INDIA_STPI_BASE64' },
  { path: 'public/certifications/india/cmmi.png', constant: 'INDIA_CMMI_BASE64' },
  { path: 'public/certifications/usa/soc2.png', constant: 'USA_SOC2_BASE64' },
  { path: 'public/certifications/usa/nist.png', constant: 'USA_NIST_BASE64' },
  { path: 'public/certifications/uk/cyber-essentials.png', constant: 'UK_CYBER_ESSENTIALS_BASE64' },
  { path: 'public/certifications/uk/ico.png', constant: 'UK_ICO_BASE64' },
  { path: 'public/certifications/germany/tuv.png', constant: 'GERMANY_TUV_BASE64' },
  { path: 'public/certifications/germany/bsi.png', constant: 'GERMANY_BSI_BASE64' },
  { path: 'public/certifications/singapore/imda.png', constant: 'SINGAPORE_IMDA_BASE64' },
  { path: 'public/certifications/singapore/pdpa.png', constant: 'SINGAPORE_PDPA_BASE64' },
];

console.log('// Base64 encoded certification logos');
console.log('');

certifications.forEach(cert => {
  try {
    const buffer = fs.readFileSync(cert.path);
    const base64 = buffer.toString('base64');
    console.log(`export const ${cert.constant} = "data:image/png;base64,${base64}";`);
  } catch (error) {
    console.log(`export const ${cert.constant} = ""; // File not found: ${cert.path}`);
  }
});
