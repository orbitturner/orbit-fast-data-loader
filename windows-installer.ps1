# Teste les privilèges administratifs
$adminRights = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

# Vérifie si l'utilisateur a les droits d'administrateur
if (-not $adminRights) {
    return Write-Host "❌ Please Bro RUN this script as an SUDO. Right-click the PowerShell icon and select 'Run as Administrator.' 😫😫 Are you Mad ?!"
}

Write-Host "💻 === Windows Installation === 💻"

# Clone le repo dans le répertoire temporaire
$temp_directory = [System.IO.Path]::Combine($env:TEMP, 'orbit-fast-data-loader')
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

# Détermine le répertoire où stocker les applications
$app_directory = "C:\Program Files\OrbitFastDataLoader"

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
