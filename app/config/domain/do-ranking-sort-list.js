// import SelectRadio from 'focus-components/components/input/select-radio';
import { translate } from 'focus-core/translation';

//OPEN, CLOSED, STARTED, ENDED

export default {
    // SelectComponent: SelectRadio,
    refContainer: {
        rankingSortList: [
            { code: 'SCORE_ASC', label: translate('select.scoreAscending') },
            { code: 'SCORE_DESC', label: translate('select.scoreDescending') }
        ]
    },
    listName: 'rankingSortList',
    formatter: translate
};