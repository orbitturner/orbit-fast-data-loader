PostgreSQL 15
Utilisation:

 --help                                      Affichage de la listes des options valides

 --version                                   Affichage des informations sur le produit

 --unattendedmodeui <unattendedmodeui>       Unattended Mode UI
                                             Par défaut: minimal
                                             Autorisé: none minimal minimalWithDialogs

 --optionfile <optionfile>                   Installation option file
                                             Par défaut: 

 --debuglevel <debuglevel>                   Debug information level of verbosity
                                             Par défaut: 2
                                             Autorisé: 0 1 2 3 4

 --mode <mode>                               Installation mode
                                             Par défaut: qt
                                             Autorisé: qt win32 unattended

 --debugtrace <debugtrace>                   Debug filename
                                             Par défaut: 

 --enable-components <enable-components>     Comma-separated list of components
                                             Par défaut: server,pgAdmin,stackbuilder,commandlinetools
                                             Autorisé: server pgAdmin stackbuilder commandlinetools

 --disable-components <disable-components>   Comma-separated list of components
                                             Par défaut: 
                                             Autorisé: server pgAdmin stackbuilder commandlinetools

 --installer-language <installer-language>   Language selection
                                             Par défaut: fr
                                             Autorisé: en es fr

 --extract-only <extract-only>               
                                             Par défaut: 0

 --superaccount <superaccount>               Configure le nom utilisateur du super-utilisateur de la base de données. Par défaut, « postgres ».
                                             Par défaut: postgres

 --servicename <servicename>                 Définit le nom du service de base de données.
                                             Par défaut: 

 --serviceaccount <serviceaccount>           Configure le compte utilisateur du système d'exploitation qui possède le processus serveur. Par défaut, « postgres ».
                                             Par défaut: 

 --servicepassword <servicepassword>         Configure le mot de passe pour le compte utilisateur du système d'exploitation qui possède le processus serveur. Par défaut, le mot de passe du super-utilisateur.
                                             Par défaut: 

 --install_runtimes <install_runtimes>       Indique s'il faut installer le « Microsoft Visual C++ runtimes » avant le début de l'installation.
                                             Par défaut: 1

 --enable_acledit <enable_acledit>           acl.check.description
                                             Par défaut: 0

 --create_shortcuts <create_shortcuts>       Indique s'il faut créer les raccourcis.
                                             Par défaut: 1

 --prefix <prefix>                           Répertoire d'installation
                                             Par défaut: C:\Program Files\PostgreSQL\15

 --datadir <datadir>                         Répertoire des données
                                             Par défaut: C:\Program Files\PostgreSQL\15\data

 --superpassword <superpassword>             Mot de passe
                                             Par défaut: 

 --serverport <serverport>                   Port
                                             Par défaut: 5432

 --locale <locale>                           Locale
                                             Par défaut: 


