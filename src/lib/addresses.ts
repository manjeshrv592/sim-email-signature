/**
 * Country-specific office addresses for email signatures
 */

export interface OfficeAddress {
  buildingName: string;
  addressLine1: string;
  addressLine2: string;
}

/**
 * Get office address based on country/usage location
 * @param usageLocation - ISO country code (e.g., "IN", "US", "GB", "DE", "SG")
 * @returns Office address for the country
 */
export function getOfficeAddress(usageLocation?: string | null): OfficeAddress {
  const addresses: Record<string, OfficeAddress> = {
    "IN": { // India (Real Address)
      buildingName: "Gopalan Signature Tower",
      addressLine1: "3rd, Floor, No.6, Old Madras Road, Nagavarapalya,",
      addressLine2: "C.V.Raman Nagar, Bangalore - 560093"
    },
    "US": { // United States (Test Address)
      buildingName: "Simtech Tower",
      addressLine1: "1234 Market Street, Suite 500,",
      addressLine2: "San Francisco, CA 94103"
    },
    "GB": { // United Kingdom (Test Address)
      buildingName: "Simtech House",
      addressLine1: "25 Old Broad Street, Floor 3,",
      addressLine2: "London EC2N 1HQ"
    },
    "DE": { // Germany (Test Address)
      buildingName: "Simtech Zentrum",
      addressLine1: "Friedrichstraße 95, 3. Etage,",
      addressLine2: "10117 Berlin"
    },
    "SG": { // Singapore (Test Address)
      buildingName: "Simtech Plaza",
      addressLine1: "1 Raffles Place, #40-02,",
      addressLine2: "Singapore 048616"
    }
  };

  // Get country-specific address or default to India
  const countryCode = usageLocation?.toUpperCase() || "IN";
  return addresses[countryCode] || addresses["IN"];
}
