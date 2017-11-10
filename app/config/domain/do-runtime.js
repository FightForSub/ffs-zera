import moment from 'moment';

export default {
    type: 'number',
    validator: [{
        type: 'number'
    }]
    //formatter: value => value ? value === 0 ? '-' : moment.duration({seconds: value}).humanize() : '-'
};
