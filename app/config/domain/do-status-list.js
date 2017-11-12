// import SelectRadio from 'focus-components/components/input/select-radio';
import { translate } from 'focus-core/translation';

//OPEN, CLOSED, STARTED, ENDED

export default {
    // SelectComponent: SelectRadio,
    refContainer: {
        eventStatusList: [
            { code: 'OPEN', label: translate('select.open') },
            { code: 'CLOSED', label: translate('select.closed') },
            { code: 'STARTED', label: translate('select.started') },
            { code: 'ENDED', label: translate('select.ended') }
        ]
    },
    listName: 'eventStatusList',
    formatter: translate
};
