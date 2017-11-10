import { init } from 'focus-core/definition/formatter/number';
import 'numeral/locales/fr';


export default () => {
    console.info('|--- NUMERAL');
    // Initialise numeral conf 
    init();
    // init('0,0','fr'); Exemple d'initialisation
    console.info('   |--- Numeral correctly initialized.');
}
