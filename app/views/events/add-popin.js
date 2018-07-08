import React from 'react';
import createReactClass from 'create-react-class';
import { mixin as formPreset } from 'focus-components/common/form';
import { translate } from 'focus-core/translation';
import EventStore from '@/stores/event';
import eventActions from '@/action/event';
import { navigate } from '@/utilities/router';

export default createReactClass({
    displayName: 'EventCreationView',
    mixins: [formPreset],
    definitionPath: 'event',
    action: {
        load: eventActions.load
    },
    stores: [
        {
            store: EventStore,
            properties: ['eventDetail']
        }
    ],
    componentWillMount() {
        this.action.save = this.save;
    },
    save() {
        const { date, reference, isEdit, isLoading, eventDetail, reservedToAffiliates, reservedToPartners, minimumViews, minimumFollowers, ...dataToSave } = this.state;
        dataToSave.reserved_to_affiliates = reservedToAffiliates;
        dataToSave.reserved_to_partners = reservedToPartners;
        dataToSave.minimum_views = minimumViews;
        dataToSave.minimum_followers = minimumFollowers;

        if (this.props.forCreation) {
            eventActions.create(dataToSave, this);
        } else {
            eventActions.update(dataToSave, this);
        }
    },
    saveOnEnter(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.clearError();
            if (this._validate()) {
                this.action.save.call(this, this._getEntity());
            }
        }
    },
    componentDidMount() {
        this.refs['event.name'].refs.input.refs.htmlInput.focus();
    },

    afterChange(changeInfos) {
        if (changeInfos && changeInfos.informations && changeInfos.informations.callerId && this._identifier === changeInfos.informations.callerId) {
            if (changeInfos.status && changeInfos.status.name && changeInfos.status.name === 'saved') {
                this._displayMessageOnChange(changeInfos);
                if (this.props.onSave) {
                    eventActions.load(this.props.id)
                    this.props.onSave();
                } else {
                    const id = EventStore.getEventDetail().id;
                    navigate('event/' + id);
                }
            }
        }
    },
    buildBooleanProps(fieldName) {
        return {
            value: this.state[fieldName] == null ? null : '' + this.state[fieldName],
            onChange: (value) => this.setState({ [fieldName]: (value === 'true' ? true : value === 'false' ? false : null) })
        }
    },
    /** @inheritDoc */
    renderContent() {
        return (
            <div data-app='live-page' onKeyUp={this.saveOnEnter} >
                <h3 className='website-title'>{translate('label.createEvent')}</h3>
                <div>
                    {this.fieldFor('name')}
                    {this.fieldFor('description')}
                    {this.fieldFor('status')}
                    {this.fieldFor('reservedToAffiliates', this.buildBooleanProps('reservedToAffiliates'))}
                    {this.fieldFor('reservedToPartners', this.buildBooleanProps('reservedToPartners'))}
                    {this.fieldFor('minimumViews')}
                    {this.fieldFor('minimumFollowers')}
                    {!this.props.forCreation && this.fieldFor('current', this.buildBooleanProps('current'))}
                    {this.buttonSave()}
                </div>
            </div>
        );
    }
});
