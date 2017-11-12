import SelectRadio from 'focus-components/components/input/select-radio';
import { translate } from 'focus-core/translation';

export default {
    SelectComponent: SelectRadio,
    refContainer: { yesNoList: [{ code: 'true', value: true, label: 'select.oui' }, { code: 'false', value: false, label: 'select.non' }] },
    listName: 'yesNoList',
    formatter: translate
};
