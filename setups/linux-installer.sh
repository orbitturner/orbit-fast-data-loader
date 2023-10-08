#!/bin/bash

echo "🐧 === Linux Installation === 🐧"

# Vérifie si le script est exécuté en tant que root (administrateur)
if [ "$EUID" -ne 0 ]; then
    echo "❌ Please run this script as root (administrator). Use 'sudo ./linux-installer.sh'. 😫 Are you Mad ?!"
    exit 1
fi

# Détermine le répertoire où stocker les applications (peut varier selon la distribution Linux)
app_directory="/usr/local/bin"

echo "💻 === Linux Installation === 💻"

# Vérifie si le programme est déjà installé
if [ -f "$app_directory/OrbitFastDataLoader" ]; then
    read -p "Program is already installed at $app_directory. Do you want to reinstall? (Y/N): " reinstall

    if [ "$reinstall" == "N" ]; then
        echo "🚫 Installation aborted by user."
        exit 1
    elif [ "$reinstall" == "Y" ]; then
        # Supprime le programme existant et son alias
        echo "🗑 Uninstalling existing program..."
        rm -f "$app_directory/OrbitFastDataLoader"
        sed -i '/^alias OrbitFastDataLoader=/d' ~/.bashrc
    else
        echo "Invalid option. Exiting..."
        exit 1
    fi
fi

# Clone le repo dans le répertoire temporaire
temp_directory="/tmp/orbit-fast-data-loader"

# Supprime le répertoire temporaire s'il existe déjà
if [ -d "$temp_directory" ]; then
    echo "🗑 Removing existing temporary directory..."
    rm -rf "$temp_directory"
fi

echo "🔄 Cloning the repository to $temp_directory..."
git clone https://github.com/orbitturner/orbit-fast-data-loader "$temp_directory"

# Navigue vers le répertoire cloné
cd "$temp_directory" || exit

# Installe les dépendances
echo "🛠 Installing dependencies..."
npm install

# Construit le projet
echo "🏗 Building the project..."
npm run build

# Copie tout le contenu de dist dans le répertoire des applications
echo "🚚 Copying the executable to $app_directory..."
cp -r dist/* "$app_directory/"

# Crée un alias dans le fichier de profil (par exemple, .bashrc)
echo "🔗 Creating an alias..."
echo "alias OrbitFastDataLoader='node $app_directory/OrbitFastDataLoader'" >> ~/.bashrc

# Charge les modifications du fichier de profil
source ~/.bashrc

# Affiche un message de succès
echo "🎉 Installation completed successfully. You can now use 'OrbitFastDataLoader' from the command line."
