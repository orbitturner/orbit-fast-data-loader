import { exec } from 'child_process';
import { ConnectionOptions, ExportOptions } from '../utils/types';
import { logger } from '../utils/logger';
import ora from 'ora';

export function exportData(options: ConnectionOptions & ExportOptions): void {
    const { sgbd, file, host, port, database, username, password, separator, tablename, schema } = options;

    delete options.password;

    logger.info(`Exporting data in ${file} FROM ${database}.${schema}.${tablename}...`);
    logger.info(`-> Connection options: ${JSON.stringify(options)}`);

    const exportCommand =
        sgbd === 'sqlserver'
            ? `bcp ${database}.${schema}.${tablename} out ${file} -S ${host},${port} -U ${username} -P ${password} -c -t${separator}`
            : `psql -h ${host} -p ${port} -U ${username} -d ${database} -c "COPY ${schema}.${tablename} TO '${file}' DELIMITER '${separator}' CSV HEADER"`;

    const spinner = ora('🚀 Launching Data Export Engine 🚀...').start();

    exec(exportCommand, (error, stdout, stderr) => {
        spinner.stop();

        logger.info(stdout);
        
        if (error) {
            logger.error(`Error exporting data: ${error.message}`);
            return;
        }

        if (stderr) {
            logger.error(`Error exporting data: ${stderr}`);
            return;
        }

        console.log('==============================================');
        logger.info('Data imported successfully!'.toUpperCase());
        console.log('==============================================');
    });
}
