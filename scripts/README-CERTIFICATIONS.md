# Certification Image to Base64 Converter

This script helps convert certification images to base64 format for embedding in email signatures.

## How to Use:

### Quick Method (PowerShell):
Run this command for each certification image:

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes('public/certifications/iso-27001.png'))
```

### Batch Conversion:
Run the Node.js script:

```bash
node scripts/convert-certifications.js
```

Then copy the output and replace the placeholder constants in `src/lib/certifications.ts`.

## Files to Convert:

1. Common (All Countries):
   - `public/certifications/iso-27001.png` → `ISO_27001_BASE64`
   - `public/certifications/iso-42001.png` → `ISO_42001_BASE64`

2. India:
   - `public/certifications/india/stpi.png` → `INDIA_STPI_BASE64`
   - `public/certifications/india/cmmi.png` → `INDIA_CMMI_BASE64`

3. USA:
   - `public/certifications/usa/soc2.png` → `USA_SOC2_BASE64`
   - `public/certifications/usa/nist.png` → `USA_NIST_BASE64`

4. UK:
   - `public/certifications/uk/cyber-essentials.png` → `UK_CYBER_ESSENTIALS_BASE64`
   - `public/certifications/uk/ico.png` → `UK_ICO_BASE64`

5. Germany:
   - `public/certifications/germany/tuv.png` → `GERMANY_TUV_BASE64`
   - `public/certifications/germany/bsi.png` → `GERMANY_BSI_BASE64`

6. Singapore:
   - `public/certifications/singapore/imda.png` → `SINGAPORE_IMDA_BASE64`
   - `public/certifications/singapore/pdpa.png` → `SINGAPORE_PDPA_BASE64`

## Alternative: Use External URLs (Temporary)

For testing, you can temporarily use external URL hosting:
1. Upload images to your domain
2. Use full URLs in the certifications.ts file
3. Later convert to base64 for better email client compatibility

## Recommended Image Size:
- Height: 40-60px
- Format: PNG with transparent background
- File size: < 50KB per image
