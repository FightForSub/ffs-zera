import InputTextarea from 'focus-components/components/input/textarea';

export default {
    type: 'text',
    InputComponent: InputTextarea,
    validator: [{
        type: 'string',
        options: {
            maxLength: 5000
        }
    }]
};
