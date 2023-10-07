import figlet from 'figlet';

export function showBanner() {
  return new Promise((resolve, reject) => {
    figlet.text('OrbitFastDataLoader', {
      font: 'Standard', // Choisir la police de caractères (consultez la documentation pour plus d'options)
      horizontalLayout: 'default',
      verticalLayout: 'default',
    }, (error: any, banner: any) => {
      if (error) {
        console.error('Error generating banner:', error);
        reject(error);
      }
      console.log(banner);
      resolve(banner);
    });
  });
  
  // figlet.text('OrbitFastDataLoader', {
  //   font: 'Standard', // Choisir la police de caractères (consultez la documentation pour plus d'options)
  //   horizontalLayout: 'default',
  //   verticalLayout: 'default',
  // }, (error: any, banner: any) => {
  //   if (error) {
  //     console.error('Error generating banner:', error);
  //     return;
  //   }
  //   console.log(banner);
  // });
}
