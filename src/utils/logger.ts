import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

class Logger {
  private static instance: Logger;
  private logDir: string;

  private constructor() {
    // log the content of the app base directory like ls command
    // const execRootDir = path.join(process.execPath, '..')
    const myPath = path.join(__dirname, '../');
    // console.log(chalk.yellow(`--> My Virtual Path Content : ${fs.readdirSync(myPath)}`));
    
    this.logDir = path.join(myPath, 'logs');
    this.createLogDir();
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private getCurrentDateTime(): string {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0];
    return `${date} ${time}`;
  }

  private createLogDir(): void {
    if (!fs.existsSync(this.logDir)) {
      console.log(chalk.yellow(`--> Creating log directory: ${this.logDir}`));
      fs.mkdirSync(this.logDir);
    }
  }

  private getLogFile(): string {
    const currentDate = new Date().toISOString().split('T')[0];
    return path.join(this.logDir, `${currentDate}.log`);
  }

  public info(message: string): void {
    const dateTime = this.getCurrentDateTime();
    const logMessage = `✅ [INFO] - [${dateTime}] - ${message}\n`;
    console.log(chalk.green(logMessage));
    fs.appendFileSync(this.getLogFile(), logMessage);
  }

  public error(message: string): void {
    const dateTime = this.getCurrentDateTime();
    const logMessage = `❌ [ERROR] - [${dateTime}] - ${message}\n`;
    console.error(chalk.red(logMessage));
    fs.appendFileSync(this.getLogFile(), logMessage);
  }
}

export const logger = Logger.getInstance();
