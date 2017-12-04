import React from 'react';
import fieldBehaviourMixin from '../../common/mixin/field-component-behaviour';
import assign from 'object-assign';
import { component as Field } from '../../common/field';
import DisplayText from '../../components/display/text';

const builtInComponentsMixin = {
    /**
     * inherited minxins
     */
    mixins: [fieldBehaviourMixin],

    /**
     * @inheritDoc
     */
    getDefaultProps() {
        return {
            isEdit: false
        };
    },

    /**
     * create an edit field for the given property metadata.
     * @param {string} name - name of the field.
     * @param {object} options - An object which contains all options for the built of the field.
     * @returns {object} - A React Field.
     */
    fieldFor(name, options) {
        const def = (this.definition && this.definition[name]) ? this.definition[name] : {};

        options = assign({}, {
            isEdit: this.props.isEdit,
            hasLabel: false,
            value: options && options.value !== undefined ? options.value : this.props.data[name],
            refContainer: options && options.refContainer || def.refContainer || this.props.reference,
            style: { className: 'form-list' }
        }, options);

        let fieldProps = this._buildFieldProps(name, options, this);
        return React.createElement(Field, fieldProps);
    },
    /**
     * Add a select with a list name component It is a shortcut for the fieldComponent.
     * @param {string} name         - The property name.
     * @param {string} referenceKey - The list name in the references.
     * @param {object} options - An object which contains all options for the built of the field.
     * @returns {object} - A React Field.
     */
    selectFor(name, referenceKey, options) {
        options = options || {};
        options.listName = referenceKey;
        return this.fieldFor(name, options);
    },
    /**
     * Display a field.
     * @param {string} name - property name.
     * @param {object} options - options object.
     * @returns {object} - A React Field in display mode.
     */
    displayFor(name, options) {
        options = assign({}, {
            isEdit: false,
            hasLabel: false,
            value: this.props.data[name],
            refContainer: this.props.reference,
            style: { className: 'form-list' }
        }, options);

        let fieldProps = this._buildFieldProps(name, options, this);
        return React.createElement(Field, fieldProps);
    },

    /**
     * Display the text for a given property.
     * @param {string} name  - property name.
     * @param {object} options - Option object
     * @returns {object} - A React component.
     */
    textFor(name, options) {
        options = options || {};
        let def = (this.definition && this.definition[name]) ? this.definition[name] : {};
        return React.createElement(DisplayText, {
            name: options.name || `${this.definitionPath}.${name}`,
            style: options.style,
            FieldComponent: def.FieldComponent,
            formatter: options.formatter || def.formatter,
            value: this.props.data[name]
        });
    }
};

export default builtInComponentsMixin;
