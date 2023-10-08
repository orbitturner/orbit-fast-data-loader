import chalk from 'chalk';
import figlet from 'figlet';

export function showBanner() {
  return console.log(chalk.magenta(figlet.textSync('OrbitFastDataLoader', {
    font: 'Standard', // Choisir la police de caractères (consultez la documentation pour plus d'options)
    horizontalLayout: 'default',
    verticalLayout: 'default',
  })));
}
