import { program } from 'commander';
import { importData } from './commands/import';
import { exportData } from './commands/export';
import { showBanner } from './utils/banner';
import { ConnectionOptions, ExportOptions, ImportOptions } from './utils/types';
import { logger } from './utils/logger';
import { installDependencies } from './commands/install';
import { exit } from 'process';



// 🟢💻 WELCOME TO THE SPACESHIP - DEVELOPED BY 💻🟢
//  ██████╗ ██████╗ ██████╗ ██╗████████╗    ████████╗██╗   ██╗██████╗ ███╗   ██╗███████╗██████╗
// ██╔═══██╗██╔══██╗██╔══██╗██║╚══██╔══╝    ╚══██╔══╝██║   ██║██╔══██╗████╗  ██║██╔════╝██╔══██╗
// ██║   ██║██████╔╝██████╔╝██║   ██║          ██║   ██║   ██║██████╔╝██╔██╗ ██║█████╗  ██████╔╝
// ██║   ██║██╔══██╗██╔══██╗██║   ██║          ██║   ██║   ██║██╔══██╗██║╚██╗██║██╔══╝  ██╔══██╗
// ╚██████╔╝██║  ██║██████╔╝██║   ██║          ██║   ╚██████╔╝██║  ██║██║ ╚████║███████╗██║  ██║
//  ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝   ╚═╝          ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝
// 💚🔰 KEEP GOING FURTHER 🔰💚
/**
 * 💨 Project Name : OrbitFastDataLoader
 * 💨 Project Repo : https://github.com/orbitturner/OrbitFastDataLoader
 * 💨 My GitHub    : https://github.com/orbitturner
 * 💨 My LinkedIn  : https://linkedin.com/in/orbitturner
 * 💨 My Twitter   : https://twitter.com/orbitturner
 */

showBanner();

// Importez le fichier package.json
let packageJson;

if (__filename.endsWith('.ts')) {
  // console.log('Running TypeScript file!');
  // Le script est exécuté en tant que fichier TypeScript
  packageJson = require('../package.json');
} else {
  // console.log('Running JavaScript file!');
  // Le script est exécuté en tant que fichier JavaScript (après compilation)
  packageJson = require('./package.json');
}

program.version(packageJson.version).description(packageJson.description);

// Commande d'installation des dépendances
program
  .command('install-deps')
  .description('Install dependencies')
  .action(() => {
    installDependencies();
  });

// Commande d'importation
program
  .command('import')
  .description('Import data into the database')
  .option('--sgbd <sgbd>', 'Specify the SGBD (sqlserver or postgresql)')
  .option('-h, --host <host>', 'Specify the database host')
  .option('-p, --port <port>', 'Specify the database port', parseInt)
  .option('-d, --database <database>', 'Specify the database name')
  .option('-u, --username <username>', 'Specify the database username')
  .option('-P, --password <password>', 'Specify the database password')
  .option('-t, --tablename <tablename>', 'Specify the table name')
  .option('-c, --schema <schema>', 'Specify the schema')
  .option('-f, --file <file>', 'Specify the input file')
  .option('-s, --separator <separator>', 'Specify the field separator')
  .action((options: ConnectionOptions & ImportOptions) => {
    // Si aucune option n'est spécifiée logguer une erreur
    if (!options.sgbd || !options.host || !options.port || !options.database || !options.username || !options.password || !options.tablename || !options.schema || !options.file || !options.separator) {
      logger.error('Invalid command. Use --help to see available commands.');
      exit(1);
    }
    importData(options);
  });

// Commande d'exportation
program
  .command('export')
  .description('Export data from the database')
  .option('--sgbd <sgbd>', 'Specify the SGBD (sqlserver or postgresql)')
  .option('-h, --host <host>', 'Specify the database host')
  .option('-p, --port <port>', 'Specify the database port', parseInt)
  .option('-d, --database <database>', 'Specify the database name')
  .option('-u, --username <username>', 'Specify the database username')
  .option('-P, --password <password>', 'Specify the database password')
  .option('-t, --tablename <tablename>', 'Specify the table name')
  .option('-c, --schema <schema>', 'Specify the schema')
  .option('-f, --file <file>', 'Specify the output file')
  .option('-s, --separator <separator>', 'Specify the field separator')
  .action((options: ConnectionOptions & ExportOptions) => {
    // Si aucune option n'est spécifiée logguer une erreur
    if (!options.sgbd || !options.host || !options.port || !options.database || !options.username || !options.password || !options.tablename || !options.schema || !options.file || !options.separator) {
      logger.error('Invalid command. Use --help to see available commands.');
      exit(1);
    }

    exportData(options);
  });

// program.addHelpText('before', '\n==> Welcome to the Spaceship - Developed by <OrbitTurner> <==\n\n==> Keep going further <==\n\n==> Project Name : OrbitFastDataLoader\n==> Project Repo : https://github.com/orbitturner/OrbitFastDataLoader\n==> My GitHub    : https://github.com/orbitturner\n==> My LinkedIn  : https://linkedin.com/in/orbitturner\n==> My Twitter   : https://twitter.com/orbitturner\n\n==> Usage: OrbitFastDataLoader <command> [options]\n\n==> Commands:\n  import\tImport data into the database\n  export\tExport data from the database\n  install-deps\tInstall dependencies\n\n==> Options:\n  -h, --help\tDisplay help for command\n\n==> Version:\n  1.0.0\n\n==> Author:\n  OrbitTurner');
program.addHelpText('after', '\n==> Examples:\n  $ OrbitFastDataLoader import --sgbd sqlserver -h localhost -p 1433 -d mydatabase -u myuser -P mypassword -t mytable -c dbo -f data.csv -s ,\n  $ OrbitFastDataLoader export --sgbd postgresql -h localhost -p 5432 -d mydatabase -u myuser -P mypassword -t mytable -c public -f data.csv -s ,\n  $ OrbitFastDataLoader install-deps');

// Gestion des erreurs de commande inconnue
// program.on('command:*', () => {
//   logger.error('Invalid command. Use --help to see available commands.');
// });

program.parse(process.argv);

