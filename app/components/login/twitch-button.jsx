import React, { Component } from 'react';
import { translate } from 'focus-core/translation';

class TwitchButton extends Component {
    constructor(props) {
        super(props);
        this.doLogin = this.doLogin.bind(this);
    }

    doLogin() {
        Twitch.login({
            scope: ['user_read'],
            redirect_uri: __ROOT_URL__
        });
    }

    render() {
        return (
            <button
                className='twitch-sign-in'
                onClick={this.doLogin}
            >
                <i className='fa fa-twitch' />
                <span>
                    {translate('global.login.twitch')}
                </span>
            </button>
        );
    }
}

TwitchButton.displayName = 'TwitchButton';

export default TwitchButton;
