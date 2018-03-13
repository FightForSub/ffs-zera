import { init } from 'focus-core/definition/formatter/number';
import 'numeral/locales/fr';


export default () => {
    console.info('|--- NUMERAL');
    // Initialise numeral conf 
    init('0,0.[00]');
    console.info('   |--- Numeral correctly initialized.');
}
