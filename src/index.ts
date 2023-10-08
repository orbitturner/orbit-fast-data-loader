import { program } from 'commander';
import { importData } from './commands/import';
import { exportData } from './commands/export';
import { showBanner } from './utils/banner';
import { ConnectionOptions, ExportOptions, ImportOptions } from './utils/types';
import { logger } from './utils/logger';
import { installDependencies } from './commands/install';

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

showBanner();

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
        exportData(options);
    });

program.on('--help', () => {
    console.log('');
    console.log('\n==> Examples:');
    console.log('  $ OrbitFastDataLoader import --sgbd sqlserver -h localhost -p 1433 -d mydatabase -u myuser -P mypassword -t mytable -c dbo -f data.csv -s ,');
    console.log('  $ OrbitFastDataLoader export --sgbd postgresql -h localhost -p 5432 -d mydatabase -u myuser -P mypassword -t mytable -c public -f data.csv -s ,');
    console.log('');
    console.log('  $ OrbitFastDataLoader install-deps');
});

// Gestion des erreurs de commande inconnue
program.on('command:*', () => {
    logger.error('Invalid command. Use --help to see available commands.');
  });


program.parse(process.argv);

