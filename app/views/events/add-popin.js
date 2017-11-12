import React from 'react';
import { mixin as formPreset } from 'focus-components/common/form';
import { translate } from 'focus-core/translation';
import EventStore from '../../stores/event';
import eventActions from '../../action/event';
// import Article from '../../components/article';
// import Section from '../../components/article';
import { navigate } from '../../utilities/router';

export default React.createClass({
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
        const { date, reference, isEdit, isLoading, eventDetail, reservedToAffiliates, reservedToPartners, ...dataToSave } = this.state;
        dataToSave.reserved_to_affiliates = reservedToAffiliates;
        dataToSave.reserved_to_partners = reservedToPartners;

        if (this.props.forCreation) {
            eventActions.create(dataToSave, this);
        } else {
            eventActions.update(dataToSave, this);
        }

        // // alert('TODO save \n' + JSON.stringify(data, null, 4));
        // this.props.onSave();
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
    /** @inheritDoc */
    renderContent() {
        return (
            <div data-app='live-page'>
                <h3 className='website-title'>{translate('label.createEvent')}</h3>
                <div>
                    {this.fieldFor('name')}
                    {this.fieldFor('description')}
                    {this.fieldFor('status')}
                    {this.fieldFor('reservedToAffiliates', { value: this.state.reservedToAffiliates == null ? null : '' + this.state.reservedToAffiliates, onChange: (value) => this.setState({ reservedToAffiliates: (value === 'true' ? true : value === 'false' ? false : null) }) })}
                    {this.fieldFor('reservedToPartners', { value: this.state.reservedToPartners == null ? null : '' + this.state.reservedToPartners, onChange: (value) => this.setState({ reservedToPartners: (value === 'true' ? true : value === 'false' ? false : null) }) })}
                    {!this.props.forCreation && this.fieldFor('current', { value: this.state.current == null ? null : '' + this.state.current, onChange: (value) => this.setState({ current: (value === 'true' ? true : value === 'false' ? false : null) }) })}

                    {/* {this.fieldFor('date')} */}
                    {this.buttonSave()}
                </div>
            </div>
        );
    }
});
// {"id":3,"name":"TestName","description":"TestDesc","reservedToAffiliates":false,"reservedToPartners":false,"status":"OPEN","current":false}
