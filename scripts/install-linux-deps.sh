#!/bin/bash

# Vérification des droits d'administration
if [ "$EUID" -ne 0 ]
then
  echo "Ce script doit être exécuté avec les droits d'administration (root)."
  exit
fi

# Vérification si les prérequis sont déjà installés
if ! command -v curl &> /dev/null; then
  echo "Installation des prérequis..."
  apt update
  apt install -y curl apt-transport-https
else
  echo "Les prérequis sont déjà installés."
fi

# Vérification si la clé GPG de Microsoft est déjà importée
if ! apt-key list | grep -q "Microsoft"; then
  echo "Importation de la clé GPG de Microsoft..."
  curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
else
  echo "La clé GPG de Microsoft est déjà importée."
fi

# Vérification si le référentiel de packages de Microsoft est déjà ajouté
if [ ! -f "/etc/apt/sources.list.d/mssql-release.list" ]; then
  echo "Ajout du référentiel de packages de Microsoft..."
  curl https://packages.microsoft.com/config/ubuntu/$(lsb_release -rs)/prod.list > /etc/apt/sources.list.d/mssql-release.list
else
  echo "Le référentiel de packages de Microsoft est déjà ajouté."
fi

# Vérification si le package mssql-tools est déjà installé
if ! dpkg -s mssql-tools &> /dev/null; then
  echo "Installation de MS SQL Tools & UnixOdbc..."
  apt update
  ACCEPT_EULA=Y apt install -y mssql-tools unixodbc-dev
else
  echo "MS SQL Tools & UnixOdbc sont déjà installés."
fi

# Vérification si les variables d'environnement sont déjà configurées
if ! grep -q "/opt/mssql-tools/bin" ~/.bashrc || ! grep -q "/opt/mssql-tools/bin" ~/.zshrc; then
  echo "Configuration des variables d'environnement..."

  if ! grep -q "/opt/mssql-tools/bin" ~/.bashrc; then
    echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc
  fi

  if ! grep -q "/opt/mssql-tools/bin" ~/.zshrc; then
    echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.zshrc
  fi

  source ~/.bashrc
  source ~/.zshrc
else
  echo "Les variables d'environnement sont déjà configurées."
fi

# Vérification de l'installation de BCP
if command -v bcp &> /dev/null; then
  echo "L'installation de BCP est déjà terminée."
else
  echo "L'installation de BCP est terminée."
fi

# Vérifier si PSQL est installé
if ! command -v psql &> /dev/null; then
    echo "PSQL is not installed. Installing..."
    sudo apt-get install -y postgresql-client
else
    echo "PSQL is already installed."
fi