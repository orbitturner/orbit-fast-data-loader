# Install-Windows-Deps.ps1

# Emoji constants
$successEmoji = "✅"
$errorEmoji = "❌"
$chocolateyEmoji = "🍫"
$installEmoji = "🚀"

# Check if Chocolatey is installed
$chocolateyInstalled = Test-Path 'C:\ProgramData\chocolatey\choco.exe'

if (-not $chocolateyInstalled) {
    Write-Host "$chocolateyEmoji Installing Chocolatey..."
    
    # Install Chocolatey
    Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

    # Check if Chocolatey installation was successful
    if ($?) {
        Write-Host "$successEmoji Chocolatey installed successfully!"
    } else {
        Write-Host "$errorEmoji Error installing Chocolatey. Please install it manually."
        exit 1
    }
}

# Install Microsoft ODBC Driver for SQL
Write-Host "$installEmoji Installing Microsoft ODBC Driver for SQL..."
choco install sqlserver-odbcdriver -y

# Check if installation was successful
if ($?) {
    Write-Host "$successEmoji Microsoft ODBC Driver for SQL installed successfully!"
} else {
    Write-Host "$errorEmoji Error installing Microsoft ODBC Driver for SQL."
    exit 1
}

# Install SQL Server Command Line Utilities
Write-Host "$installEmoji Installing SQL Server Command Line Utilities..."
choco install sqlserver-cmdlineutils -y

# Check if installation was successful
if ($?) {
    Write-Host "$successEmoji SQL Server Command Line Utilities installed successfully!"
} else {
    Write-Host "$errorEmoji Error installing SQL Server Command Line Utilities."
    exit 1
}

# Install PostgreSQL with specific components
Write-Host "$installEmoji Installing PostgreSQL..."
choco install postgresql -y --ia '--enable-components commandlinetools --disable-components server'

# Check if installation was successful
if ($?) {
    Write-Host "$successEmoji PostgreSQL installed successfully!"
} else {
    Write-Host "$errorEmoji Error installing PostgreSQL."
    exit 1
}
