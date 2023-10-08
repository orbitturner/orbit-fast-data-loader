#!/bin/bash

echo "🐧 === Linux Installation === 🐧"

# Clone le repo
echo "🔄 Cloning the repository..."
git clone https://github.com/orbitturner/orbit-fast-data-loader

# Navigue vers le répertoire cloné
cd orbit-fast-data-loader

# Installe les dépendances
echo "🛠 Installing dependencies..."
npm install

# Construit le projet
echo "🏗 Building the project..."
npm run build

# Détermine le répertoire où stocker les applications (peut varier selon la distribution Linux)
app_directory="/usr/local/bin"

# Copie l'exécutable dans le répertoire des applications
echo "🚚 Copying the executable to $app_directory..."
cp dist/index.js $app_directory/OrbitFastDataLoader

# Crée un alias dans le fichier de profil (par exemple, .bashrc)
echo "🔗 Creating an alias..."
echo "alias OrbitFastDataLoader='node $app_directory/OrbitFastDataLoader'" >> ~/.bashrc

# Charge les modifications du fichier de profil
source ~/.bashrc

# Affiche un message de succès
echo "🎉 Installation completed successfully. You can now use 'OrbitFastDataLoader' from the command line."
