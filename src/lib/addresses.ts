/**
 * Country-specific office addresses for email signatures
 */

export interface OfficeAddress {
  buildingName: string;
  addressLine1: string;
  addressLine2: string;
}

/**
 * Get office address for email signature
 * Uses streetAddress from API, with India fallback to Gopalan address
 */
export function getOfficeAddress(country?: string | null, streetAddress?: string | null, city?: string | null): OfficeAddress {
  // India fallback address (Gopalan)
  const indiaFallback: OfficeAddress = {
    buildingName: "Gopalan Signature Tower",
    addressLine1: "3rd, Floor, No.6, Old Madras Road, Nagavarapalya,",
    addressLine2: "C.V.Raman Nagar, Bangalore - 560093"
  };

  // If country is India and no streetAddress, use fallback
  if (country === "India" && (!streetAddress || streetAddress.trim() === "")) {
    return indiaFallback;
  }

  // Use API address if available
  if (streetAddress && streetAddress.trim() !== "") {
    return {
      buildingName: city || "",
      addressLine1: streetAddress,
      addressLine2: city || ""
    };
  }

  // Default to India fallback
  return indiaFallback;
}
