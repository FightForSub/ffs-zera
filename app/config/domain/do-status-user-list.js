// import SelectRadio from 'focus-components/components/input/select-radio';
import { translate } from 'focus-core/translation';

//OPEN, CLOSED, STARTED, ENDED

export default {
    // SelectComponent: SelectRadio,
    refContainer: {
        eventStatusUserList: [
            { code: 'VALIDATED', label: 'select.validated' },
            { code: 'AWAITING_FOR_EMAIL_VALIDATION', label: 'select.awaitingEmailValidation' },
            { code: 'AWAITING_FOR_ADMIN_VALIDATION', label: 'select.awaitingAdminValidation' },
            { code: 'REFUSED', label: 'select.refused' }
        ]
    },
    listName: 'eventStatusUserList',
    formatter: translate
};