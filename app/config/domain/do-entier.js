import { format } from 'focus-core/definition/formatter/number';

export default {
    type: 'number',
    formatter: (value, isEdit) => isEdit ? value : format(value),
    validator: [{
        type: 'number'
    }]
};
