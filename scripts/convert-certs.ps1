$certFiles = @(
    @{path='public/certifications/iso-27001.png'; name='ISO_27001_BASE64'},
    @{path='public/certifications/iso-42001.png'; name='ISO_42001_BASE64'},
    @{path='public/certifications/india/stpi.png'; name='INDIA_STPI_BASE64'},
    @{path='public/certifications/india/cmmi.png'; name='INDIA_CMMI_BASE64'},
    @{path='public/certifications/usa/soc2.png'; name='USA_SOC2_BASE64'},
    @{path='public/certifications/usa/nist.png'; name='USA_NIST_BASE64'},
    @{path='public/certifications/uk/cyber-essentials.png'; name='UK_CYBER_ESSENTIALS_BASE64'},
    @{path='public/certifications/uk/ico.png'; name='UK_ICO_BASE64'},
    @{path='public/certifications/germany/tuv.png'; name='GERMANY_TUV_BASE64'},
    @{path='public/certifications/germany/bsi.png'; name='GERMANY_BSI_BASE64'},
    @{path='public/certifications/singapore/imda.png'; name='SINGAPORE_IMDA_BASE64'},
    @{path='public/certifications/singapore/pdpa.png'; name='SINGAPORE_PDPA_BASE64'}
)

Write-Output "// Base64 encoded certification logos"
Write-Output ""

foreach ($cert in $certFiles) {
    if (Test-Path $cert.path) {
        $bytes = [System.IO.File]::ReadAllBytes($cert.path)
        $base64 = [System.Convert]::ToBase64String($bytes)
        Write-Output "export const $($cert.name) = `"data:image/png;base64,$base64`";"
    } else {
        Write-Output "// File not found: $($cert.path)"
        Write-Output "export const $($cert.name) = `"`";"
    }
}
