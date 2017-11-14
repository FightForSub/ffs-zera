import React from 'react';
import FontAwesome from 'react-fontawesome';
import { translate } from 'focus-core/translation';

class TwitchButton extends React.Component {
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
