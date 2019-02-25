import React from 'react';
import connectToStore from 'focus-components/behaviours/store/connect';
import UserStore from 'focus-core/user/built-in-store';
import EventStore from '@/stores/event';
import { addSuccessMessage } from 'focus-core/message';
import { navigate } from '@/utilities/router';

import RecapEvent from '@/views/events/detail/recap-event';

import { translate } from 'focus-core/translation';
import Button from 'focus-components/components/button';
import actions from '@/action/event';


function confirmInscription({ id, token, profile }) {
    actions.confirmEvent({ id, token })
        .then(() => {
            if (EventStore.getStatus('eventUserRegistration').name === 'saved') {
                addSuccessMessage('label.confirmationSuccess');
                navigate('event/' + id);
            }
        });
}

const ConfirmationView = ({ id, token, profile }) => {
    return (
        <div data-app='live-page'>
            <h3 className='website-title'>{translate('label.confirmationEvent')}</h3>
            <RecapEvent id={id} />
            <div className='button-confirm-container'>
                {!profile.apiToken && <div>{translate('label.loginPls')}</div>}
                {profile.apiToken && <Button label='label.confirmInscription' onClick={() => confirmInscription({ id, token, profile })} />}
            </div>
        </div >
    );
}
const connect = connectToStore([{
    store: UserStore,
    properties: ['profile']
}], () => ({ profile: UserStore.getProfile() || {} }))

export default connect(ConfirmationView);