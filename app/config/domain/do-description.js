import ReactRTE from 'focus-components/components/input/rich-text';
export default {
    type: 'text',
    DisplayComponent: ReactRTE,
    InputComponent: ReactRTE,
    validator: [{
        type: 'string'
        // options: {
        //     maxLength: 5000
        // }
    }]
};
