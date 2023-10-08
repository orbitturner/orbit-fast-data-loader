# Teste les privilèges administratifs
$adminRights = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

# Vérifie si l'utilisateur a les droits d'administrateur
if (-not $adminRights) {
    return Write-Host "❌ Please Bro RUN this script as an SUDO. Right-click the PowerShell icon and select 'Run as Administrator.' 😫😫 Are you Mad ?!"
}

# Détermine le répertoire où stocker les applications
$app_directory = "C:\Program Files\OrbitFastDataLoader"

Write-Host "💻 === Windows Installation === 💻"

if (Test-Path $app_directory) {
    $reinstall = $null
    while ($reinstall -ne 'Y' -and $reinstall -ne 'N') {
        $reinstall = Read-Host "Program is already installed at $app_directory. Do you want to reinstall? (Y/N)"
    }

    if ($reinstall -eq 'Y') {
        # Supprimer le programme existant et son entrée dans l'environnement
        Write-Host "🗑 Uninstalling existing program..."
        Remove-Item -Recurse -Force $app_directory

        # Supprimer l'entrée dans l'environnement
        $envPath = [System.Environment]::GetEnvironmentVariable('Path', [System.EnvironmentVariableTarget]::Machine)
        $newPath = $envPath -replace [regex]::Escape("$app_directory;"), ''
        [System.Environment]::SetEnvironmentVariable('Path', $newPath, [System.EnvironmentVariableTarget]::Machine)
    } else {
        return Write-Host "🚫 Installation aborted by user."
    }
}


# Clone le repo dans le répertoire temporaire
$temp_directory = [System.IO.Path]::Combine($env:TEMP, 'orbit-fast-data-loader')

# Supprime le répertoire temporaire s'il existe déjà
if (Test-Path $temp_directory) {
    Write-Host "🗑 Removing existing directory: $temp_directory"
    Remove-Item $temp_directory -Recurse -Force
}

Write-Host "🔄 Cloning the repository to $temp_directory..."
git clone https://github.com/orbitturner/orbit-fast-data-loader $temp_directory

# Navigue vers le répertoire cloné
cd $temp_directory

# Installe les dépendances
Write-Host "🛠 Installing dependencies..."
npm install

# Construit le projet
Write-Host "🏗 Building the project..."
npm run build

# Crée le répertoire s'il n'existe pas
Write-Host "📁 Creating directory: $app_directory"
New-Item -ItemType Directory -Force -Path $app_directory

# Copie tout le contenu de dist dans le répertoire des applications
Write-Host "🚚 Copying the executable to $app_directory..."
Copy-Item .\dist\* $app_directory -Recurse

# Crée un script batch pour exécuter l'application
Add-Content "$app_directory\OrbitFastDataLoader.bat" "node \`"$app_directory\index.js\`" \`"%*\`" "

# Ajoute le répertoire des applications au PATH
$newPath = [System.Environment]::GetEnvironmentVariable('Path', [System.EnvironmentVariableTarget]::Machine) + ";$app_directory"
[Environment]::SetEnvironmentVariable("Path", $newPath, [EnvironmentVariableTarget]::Machine)

# Exécute la commande refreshenv pour prendre en compte les changements dans l'environnement
Write-Host "🔄 Refreshing the environment..."
refreshenv

Write-Host "🎉 Installation completed successfully. You can now use 'OrbitFastDataLoader' from the command line."
