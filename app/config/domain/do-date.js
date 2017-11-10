import moment from 'moment';
import InputDate from 'focus-components/components/input/date';

export default {
    InputComponent: InputDate,
    formatter: date => date ? moment(date, moment.ISO_8601).format('DD/MM/YYYY') : '',
    format: ['DD/MM/YYYY', 'DD-MM-YYYY', 'D MMM YYYY']
};
