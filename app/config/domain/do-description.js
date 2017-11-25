import Editor from '@/components/rich-text-editor';
export default {
    type: 'text',
    DisplayComponent: Editor,
    InputComponent: Editor,
    validator: [{
        type: 'string'
        // options: {
        //     maxLength: 5000
        // }
    }]
};
