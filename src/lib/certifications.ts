/**
 * Certification Logo Base64 Data
 * All certification logos embedded as base64 for email signatures
 * Note: Run `node scripts/convert-certifications.js` to regenerate if images change
 */

// TODO: Replace these with actual base64 data by running:
// powershell -ExecutionPolicy Bypass -File scripts/convert-certs.ps1
// Then copy the output here

// For now, using local URLs in development, Vercel URLs in production
const isDevelopment = process.env.NODE_ENV === 'development';
const BASE_URL = isDevelopment 
  ? 'http://localhost:3000'
  : (process.env.NEXT_PUBLIC_BASE_URL || 'https://sim-email-signature.vercel.app');

// Common certifications (all countries)  
export const ISO_27001_BASE64 = `${BASE_URL}/certifications/iso-27001.png`;
export const ISO_42001_BASE64 = `${BASE_URL}/certifications/iso-42001.png`;

// India certifications
export const INDIA_STPI_BASE64 = `${BASE_URL}/certifications/india/stpi.png`;
export const INDIA_CMMI_BASE64 = `${BASE_URL}/certifications/india/cmmi.png`;

// USA certifications
export const USA_SOC2_BASE64 = `${BASE_URL}/certifications/usa/soc2.png`;
export const USA_NIST_BASE64 = `${BASE_URL}/certifications/usa/nist.png`;

// UK certifications
export const UK_CYBER_ESSENTIALS_BASE64 = `${BASE_URL}/certifications/uk/cyber-essentials.png`;
export const UK_ICO_BASE64 = `${BASE_URL}/certifications/uk/ico.png`;

// Germany certifications
export const GERMANY_TUV_BASE64 = `${BASE_URL}/certifications/germany/tuv.png`;
export const GERMANY_BSI_BASE64 = `${BASE_URL}/certifications/germany/bsi.png`;

// Singapore certifications
export const SINGAPORE_IMDA_BASE64 = `${BASE_URL}/certifications/singapore/imda.png`;
export const SINGAPORE_PDPA_BASE64 = `${BASE_URL}/certifications/singapore/pdpa.png`;

/**
 * Certification logo interface
 */
export interface CertificationLogo {
  name: string;
  base64: string;
  alt: string;
}

/**
 * Get certification logos based on country/usage location
 * @param usageLocation - ISO country code (e.g., "IN", "US", "GB", "DE", "SG")
 * @returns Array of certification logos to display
 */
export function getCertificationLogos(usageLocation?: string | null): CertificationLogo[] {
  // Common certifications for all countries
  const commonCerts: CertificationLogo[] = [
    {
      name: "ISO 27001:2013",
      base64: ISO_27001_BASE64,
      alt: "ISO 27001 Certified - Information Security Management"
    },
    {
      name: "ISO 42001:2023",
      base64: ISO_42001_BASE64,
      alt: "ISO 42001 Certified - AI Management System"
    }
  ];

  // Country-specific certifications
  const countryCerts: Record<string, CertificationLogo[]> = {
    "IN": [ // India
      {
        name: "STPI",
        base64: INDIA_STPI_BASE64,
        alt: "STPI Registered - Software Technology Parks of India"
      },
      {
        name: "CMMI Level 5",
        base64: INDIA_CMMI_BASE64,
        alt: "CMMI Level 5 - Capability Maturity Model Integration"
      }
    ],
    "US": [ // United States
      {
        name: "SOC 2 Type II",
        base64: USA_SOC2_BASE64,
        alt: "SOC 2 Type II Compliant"
      },
      {
        name: "NIST",
        base64: USA_NIST_BASE64,
        alt: "NIST Cybersecurity Framework"
      }
    ],
    "GB": [ // United Kingdom
      {
        name: "Cyber Essentials Plus",
        base64: UK_CYBER_ESSENTIALS_BASE64,
        alt: "Cyber Essentials Plus Certified"
      },
      {
        name: "ICO Registered",
        base64: UK_ICO_BASE64,
        alt: "ICO Registered - Information Commissioner's Office"
      }
    ],
    "DE": [ // Germany
      {
        name: "TÜV Certified",
        base64: GERMANY_TUV_BASE64,
        alt: "TÜV Certified"
      },
      {
        name: "BSI",
        base64: GERMANY_BSI_BASE64,
        alt: "BSI - Federal Office for Information Security"
      }
    ],
    "SG": [ // Singapore
      {
        name: "IMDA",
        base64: SINGAPORE_IMDA_BASE64,
        alt: "IMDA Registered - Infocomm Media Development Authority"
      },
      {
        name: "PDPA Compliant",
        base64: SINGAPORE_PDPA_BASE64,
        alt: "PDPA Compliant - Personal Data Protection Act"
      }
    ]
  };

  // Get country-specific certs if available
  const countrySpecific = usageLocation ? (countryCerts[usageLocation.toUpperCase()] || []) : [];

  // Return common + country-specific
  return [...commonCerts, ...countrySpecific];
}
