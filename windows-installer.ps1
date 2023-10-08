# Teste les privilèges administratifs
$adminRights = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

# Vérifie si l'utilisateur a les droits d'administrateur
if (-not $adminRights) {
    Write-Host "❌ Please Bro RUN this script as an SUDO. Right-click the PowerShell icon and select 'Run as Administrator.' 😫😫 Are you Mad ?!"
    Exit
}

Write-Host "💻 === Windows Installation === 💻"

# Clone le repo
Write-Host "🔄 Cloning the repository..."
git clone https://github.com/orbitturner/orbit-fast-data-loader

# Navigue vers le répertoire cloné
cd .\orbit-fast-data-loader

# Installe les dépendances
Write-Host "🛠 Installing dependencies..."
npm install

# Construit le projet
Write-Host "🏗 Building the project..."
npm run build

# Détermine le répertoire où stocker les applications
$app_directory="C:\%programfiles%\OrbitFastDataLoader"

# Crée le répertoire s'il n'existe pas
Write-Host "📁 Creating directory: $app_directory"
New-Item -ItemType Directory -Force -Path $app_directory

# Copie l'exécutable dans le répertoire des applications
Write-Host "🚚 Copying the executable to $app_directory..."
Copy-Item .\dist\index.js $app_directory\OrbitFastDataLoader.js

# Crée un script batch pour exécuter l'application
Add-Content $app_directory\OrbitFastDataLoader.bat "node $app_directory\OrbitFastDataLoader.js `%*` "

# Ajoute le répertoire des applications au PATH
[Environment]::SetEnvironmentVariable("Path", "$($env:Path);$app_directory", [EnvironmentVariableTarget]::Machine)

Write-Host "🎉 Installation completed successfully. You can now use 'OrbitFastDataLoader' from the command line."
