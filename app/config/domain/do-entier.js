import { format } from 'focus-core/definition/formatter/number';
import { isFinite } from 'lodash/lang'
export default {
    type: 'number',
    formatter: (value, isEdit) => isEdit ? value : isFinite(value) ? format(value) : value,
    validator: [{
        type: 'number'
    }]
};
