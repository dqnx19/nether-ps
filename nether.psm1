# nether.ps - PowerShell framework from nether
# Learn more at https://ps.nether.click

function log($message) {
    Write-Host $message
} 

Export-ModuleMember -Function log


function logWarning($message) {
    Write-Warning $message
}

Export-ModuleMember -Function logWarning


function logError($message) {
    Write-Error $message
}

Export-ModuleMember -Function logError