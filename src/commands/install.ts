import { exec } from 'child_process';
import { logger } from '../utils/logger';
import { join, resolve } from 'path';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs';

export function installDependencies(): void {
  logger.info('Installing dependencies...');

  const platform = process.platform;
  logger.info(`Platform: ${platform}`);

  console.log(resolve(__dirname, '../..'));
  

  const srcDirectory = resolve(__dirname, '../..', 'src');
  const isSrcParent = fs.existsSync(srcDirectory);
  const scriptDirectory = isSrcParent ? resolve(__dirname, '../../scripts') : resolve(__dirname, '../scripts');

  console.log(chalk.yellow(`--> Virtual Script Directory Path : ${scriptDirectory}`));
  console.log(chalk.yellow(`--> My Virtual Install Scripts Path Content : ${fs.readdirSync(scriptDirectory)}`));

  
  let scriptFileName;
  let scriptPath;


  if (platform === 'win32') {
    // Installation sur Windows
    scriptFileName = 'install-windows-deps.ps1';
    scriptPath = `powershell -File "${join(scriptDirectory, scriptFileName)}"`;
  } else {
    // Installation sur Linux / macOS
    scriptFileName = 'install-linux-deps.sh';
    scriptPath = join(scriptDirectory, scriptFileName);
  }
  logger.info(`Script path: ${scriptPath}`);
  const spinner = ora(`🚀 Starting Dependencies Installation scripts on ${platform} 🚀...`).start();

  exec(scriptPath, (error, stdout, stderr) => {
    spinner.stop();

    logger.info(stdout);

    if (error) {
      logger.error(`Error installing dependencies: ${error.message}`);
      return;
    }

    if (stderr) {
      logger.error(`Error installing dependencies: ${stderr}`);
      return;
    }

    console.log('==============================================');
    logger.info('Dependencies installed successfully!'.toUpperCase());
    console.log('==============================================');
  });
}
