// import SelectRadio from 'focus-components/components/input/select-radio';
import { translate } from 'focus-core/translation';

//OPEN, CLOSED, STARTED, ENDED

export default {
    // SelectComponent: SelectRadio,
    refContainer: {
        eventStatusUserList: [
            { code: 'VALIDATED', label: translate('select.validated') },
            { code: 'AWAITING_FOR_EMAIL_VALIDATION', label: translate('select.awaitingEmailValidation') },
            { code: 'AWAITING_FOR_ADMIN_VALIDATION', label: translate('select.awaitingAdminValidation') },
            { code: 'REFUSED', label: translate('select.refused') }
        ]
    },
    listName: 'eventStatusUserList',
    formatter: translate
};