import React from 'react';
import FontAwesome from 'react-fontawesome';
import { translate } from 'focus-core/translation';
import localforage from 'localforage';
import { v4 as uuid } from 'uuid';
class TwitchButton extends React.Component {
    constructor(props) {
        super(props);
        this.doLogin = this.doLogin.bind(this);
    }

    doLogin() {
        const state = uuid();
        localforage.setItem('nonce', state).then(elt => {
            location.href = `https://api.twitch.tv/kraken/oauth2/authorize?client_id=${__CLIENT_ID__}&redirect_uri=${__ROOT_URL__}&response_type=token&scope=user_read&state=${state}`;
        })
    }

    render() {
        return (
            <div className='twitch-container'>
                <button
                    className='twitch-sign-in'
                    onClick={this.doLogin}
                >
                    <FontAwesome name='twitch' />
                    <span>
                        {translate('global.login.twitch')}
                    </span>
                </button >
            </div>
        );
    }
}

TwitchButton.displayName = 'TwitchButton';

export default TwitchButton;
