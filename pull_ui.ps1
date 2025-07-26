# https://github.com/hamed-jamali-software/taxnify
git config --global --add safe.directory D:/Apps/taxnify
Set-Location D:\Apps\taxnify
Get-Location

# Kill run_ui.ps1 if already running
$proc = Get-Process powershell -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*run_ui.ps1" }
if ($proc) {
    Write-Output "⛔ run_ui is running. Killing it..."
    $proc | Stop-Process -Force
} else {
    Write-Output "✅ No run.ps1 process found."
}

# Git update
git status
git fetch origin main 2>&1 | Write-Output
git reset --hard origin/main
git pull origin main 2>&1 | Write-Output
git log -1