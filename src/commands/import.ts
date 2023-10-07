import { exec } from 'child_process';
import { logger } from '../utils/logger';
import { ConnectionOptions, ImportOptions } from '../utils/types';
import chalk from 'chalk';
import ora from 'ora';

export function importData(options: ConnectionOptions & ImportOptions): void {
    const { sgbd, file, host, port, database, username, password, separator, tablename, schema } = options;

    delete options.password;

    logger.info(`Importing data from ${file} to ${database}.${schema}.${tablename}...`);
    logger.info(`Connection options: ${JSON.stringify(options)}`);

    const importCommand =
        sgbd === 'sqlserver'
            ? `bcp ${database}.${schema}.${tablename} in ${file} -S ${host},${port} -U ${username} -P ${password} -c -k -t'${separator}' -C RAW`
            : `psql -h ${host} -p ${port} -U ${username} -d ${database} -c "COPY ${schema}.${tablename} FROM '${file}' DELIMITER '${separator}' CSV HEADER"`;

    const spinner = ora('🚀 Launching Data Import Engine 🚀...').start();


    exec(importCommand, (error, stdout, stderr) => {
        spinner.stop();

        logger.info(stdout);

        if (error) {
            logger.error(`Error importing data: ${error.message}`);
            return;
        }

        if (stderr) {
            logger.error(`Error importing data: ${stderr}`);
            return;
        }

        console.log('==============================================');
        logger.info('Data imported successfully!'.toUpperCase());
        console.log('==============================================');
    });
}
