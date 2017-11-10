import moment from 'moment';
import 'moment/locale/fr';

export default () => {
    console.info('|--- MOMENT');

    console.info('   |--- Add locale fr');
    moment.locale('fr');
    console.info('   |--- Moment correctly initialized. Current locale:' + moment.locale());
}
