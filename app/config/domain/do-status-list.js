// import SelectRadio from 'focus-components/components/input/select-radio';
import { translate } from 'focus-core/translation';

//OPEN, CLOSED, STARTED, ENDED

export default {
    // SelectComponent: SelectRadio,
    refContainer: {
        eventStatusList: [
            { code: 'OPEN', label: 'select.open' },
            { code: 'CLOSED', label: 'select.closed' },
            { code: 'STARTED', label: 'select.started' },
            { code: 'ENDED', label: 'select.ended' }
        ]
    },
    listName: 'eventStatusList',
    formatter: translate
};
