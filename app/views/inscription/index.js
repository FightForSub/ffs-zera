import React from 'react';

import createReactClass from 'create-react-class';

import { mixin as formPreset } from 'focus-components/common/form';
import { translate } from 'focus-core/translation';
import connectToStore from 'focus-components/behaviours/store/connect';
import Radio from 'focus-components/components/input/radio';
import UserStore from 'focus-core/user/built-in-store';
import { addSuccessMessage, addErrorMessage } from 'focus-core/message';
import { navigate } from '@/utilities/router';

import EventStore from '@/stores/event';
import actions from '@/action/event';

import Article from '@/components/article';
import Section from '@/components/article/section';
import NoEventItem from '@/components/events/no-event-item';

const InscriptionView = createReactClass({
    displayName: 'InscriptionView',
    mixins: [formPreset],
    definitionPath: 'user',
    action: {},
    stores: [
        {
            store: EventStore,
            properties: ['eventUserRegistration']
        }
    ],
    componentWillMount() {
        actions.list({ status: 'OPEN' });
        this.action.save = () => {
            if (!this.state.event) {
                addErrorMessage('error.selectEvent');
                return;
            }
            return actions.registerToEvent(this.state.event, this);
        };
    },

    afterChange(changeInfos) {
        if (changeInfos && changeInfos.informations && changeInfos.informations.callerId && this._identifier === changeInfos.informations.callerId) {
            if (changeInfos.status && changeInfos.status.name && changeInfos.status.name === 'saved') {
                addSuccessMessage('label.registerSuccess');
                navigate('event/' + this.state.event);
            }
        }
    },
    renderRadioContainer() {
        return (
            <div className='radio-container'>
                {this.filteredEvents().map((elt, idx) => this.renderCustomRadio(elt, idx))}
            </div>
        );
    },
    renderCustomRadio({ id, name, reservedToPartners, reservedToAffiliates, minimumViews, minimumFollowers }, key) {
        return (
            <div
                key={key}
                className={'radio-elt' + (this.state.event === id ? ' selected' : '')}
                onClick={() => this.setState({ event: id })}
            >
                <Radio value={this.state.event === id} onChange={(isChecked) => { if (isChecked) this.setState({ event: id }) }} />
                <div className={`event-info ${this.state.event === id ? 'selected' : ''}`}>
                    <div className='event-name'>{name}</div>
                    <div className='event-condition'>
                        {translate(reservedToPartners && reservedToAffiliates ? 'inscription.condition.partnersAndAffiliates' : reservedToAffiliates ? 'inscription.condition.affiliates' : reservedToPartners ? 'inscription.condition.partners' : 'inscription.condition.all')}
                    </div>
                    {!!minimumViews && <div className='event-condition'>
                        {translate('event.minimumViews') + ' : ' + minimumViews}
                    </div>}
                    {!!minimumFollowers && <div className='event-condition'>
                        {translate('event.minimumFollowers') + ' : ' + minimumFollowers}
                    </div>}
                </div>
            </div>);
    },
    filteredEvents() {
        const { followers: myFollowers, views: myViews, broadcasterType } = this.props.profile || {};
        return (this.props.eventList || [])
            .filter(({ minimumViews, minimumFollowers }) => minimumFollowers <= myFollowers && minimumViews <= myViews)
            .filter(({ reservedToAffiliates, reservedToPartners }) => {
                let isAllowed = !reservedToAffiliates && !reservedToPartners;
                isAllowed |= reservedToAffiliates && broadcasterType === 'affiliate';
                isAllowed |= reservedToPartners && broadcasterType === 'partner';
                return isAllowed;
            });
    },

    /** @inheritDoc */
    renderContent() {
        const procedure = translate('inscription.explication.detail', { returnObjects: true })
            .map((rule, i) => {
                return <li key={i}>{rule}</li>;
            });
        const events = this.filteredEvents();
        return (
            <div data-app='inscription-page'>
                <Article>
                    <div><h3 className='website-title'>{translate('label.inscription')}</h3>
                        <div>{translate('label.joinEvent')}</div>
                    </div>
                    <Section >
                        <h3 className='subheading title-green'>{translate('inscription.titles.howto')}</h3>
                        <ul>
                            {procedure}
                        </ul>
                    </Section>
                    <Section >
                        <h3 className='subheading title-green'>
                            {translate('inscription.titles.choose')}
                        </h3>
                        {events.length === 0 && <NoEventItem />}
                        {events.length > 0 && this.renderRadioContainer()}
                    </Section>
                    <Section >
                        <h3 className='subheading title-green'>
                            {translate('inscription.titles.recap')}
                        </h3>

                        <div className='recap'>
                            <div>{translate('inscription.recapPresentation')}</div>
                            <div className='recap-info'>
                                <div className='logo-login' style={{ backgroundImage: this.props.profile.logo ? `url(${this.props.profile.logo})` : null }} />
                                <div className='info'>
                                    {this.fieldFor('username', { value: this.props.profile.username, isEdit: false, hasLabel: false })}
                                    {this.fieldFor('email', { value: this.props.profile.email, isEdit: false, hasLabel: false })}
                                </div>
                            </div>
                            <div>{translate('inscription.remind')}</div>
                            <div>{translate('inscription.unsubscribe')}</div>
                            <br />
                            {this.buttonSave()}
                        </div>
                    </Section >
                </Article >
            </div >
        );
    }
});

const connect = connectToStore([{
    store: UserStore,
    properties: ['profile']
},
{
    store: EventStore,
    properties: ['eventList']
}], () => {
    return { profile: UserStore.getProfile() || {}, eventList: EventStore.getEventList() }
});

export default connect(InscriptionView);