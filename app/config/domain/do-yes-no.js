import {component as SelectRadio} from 'focus-components/common/select/radio';
import {translate} from 'focus-core/translation';

export default {
    SelectComponent: SelectRadio,
    refContainer: {yesNoList: [{code: true, label: 'select.oui'}, {code: false, label: 'select.non'}]},
    listName: 'yesNoList',
    formatter: translate
};
