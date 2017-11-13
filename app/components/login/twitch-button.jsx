import { Component } from 'react';
import { translate } from 'focus-core/translation';

class TwitchButton extends Component {
    state = {
    }

    render() {
        return (
            <button
                className='twitch-sign-in'
            >
                <i className='fa fa-twitch' />
                <span />
            </button>
        );
    }
}

TwitchButton.displayName = 'TwitchButton';

export default TwitchButton;
