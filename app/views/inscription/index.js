import React from 'react';

import { mixin as formPreset } from 'focus-components/common/form';
import { translate } from 'focus-core/translation';
import connectToStore from 'focus-components/behaviours/store/connect';
import UserStore from 'focus-core/user/built-in-store';
import { addSuccessMessage } from 'focus-core/message';
import { navigate } from '@/utilities/router';

import EventStore from '@/stores/event';
import actions from '@/action/event';

import Article from '@/components/article';
import Section from '@/components/article/section';

const InscriptionView = React.createClass({
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
        this.action.save = () => actions.registerToEvent(this.state.event, this);
    },

    afterChange(changeInfos) {
        if (changeInfos && changeInfos.informations && changeInfos.informations.callerId && this._identifier === changeInfos.informations.callerId) {
            if (changeInfos.status && changeInfos.status.name && changeInfos.status.name === 'saved') {
                addSuccessMessage('label.registerSuccess');
                navigate('event/' + this.state.event);
            }
        }
    },

    /** @inheritDoc */
    renderContent() {
        const procedure = translate('inscription.explication.detail', { returnObjects: true })
            .map((rule, i) => {
                return <li key={i}>{rule}</li>;
            });

        return (
            <div data-app='inscription-page'>
                <h3 className='website-title'>{translate('label.inscription')}</h3>
                <Article>
                    <Section title={translate('inscription.titles.explication')}>
                        <ul>
                            {procedure}
                        </ul>
                    </Section>
                    <Section title={translate('inscription.titles.recap')}>
                        <div className='recap-info'>
                            <div className='logo-login' style={{ backgroundImage: this.props.profile.logo ? `url(${this.props.profile.logo}` : null }} />
                            <div className='form'>
                                {this.fieldFor('twitchId', { value: this.props.profile.twitchId, isEdit: false })}
                                {this.fieldFor('username', { value: this.props.profile.username, isEdit: false })}
                                {this.fieldFor('email', { value: this.props.profile.email, isEdit: false })}
                                {this.fieldFor('event', { values: (this.props.eventList || []).map(({ name, id }) => ({ code: id, label: name })) })}
                                {this.buttonSave()}

                            </div>
                        </div>
                    </Section>
                </Article>
            </div>
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