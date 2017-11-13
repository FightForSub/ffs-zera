import { init } from 'focus-core/definition/formatter/number';
import 'numeral/locales/fr';


export default () => {
    console.info('|--- NUMERAL');
    // Initialise numeral conf 
    init();
    console.info('   |--- Numeral correctly initialized.');
}
