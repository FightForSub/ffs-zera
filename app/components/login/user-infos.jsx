import React from 'react';
import connectToStore from 'focus-components/behaviours/store/connect';
import UserStore from 'focus-core/user/built-in-store';
import { dispatchData } from 'focus-core/dispatcher';
import localForage from 'localforage';
import { translate } from 'focus-core/translation';
import fetch from 'focus-core/network/fetch';
import { navigate } from '@/utilities/router';

@connectToStore([{
    store: UserStore,
    properties: ['profile', 'login', 'roles']
}], () => UserStore.getValue())
class UserInfos extends React.Component {
    doLogout() {
        const token = this.props.profile && this.props.profile.token;
        if (token) {
            fetch({ url: `https://api.twitch.tv/kraken/oauth2/revoke?client_id=${__CLIENT_ID__}&token=${token}`, method: 'POST' })
                .catch(error => { });
        }
        localForage.clear();
        dispatchData('profile', null);
        navigate('home');
    }

    render() {
        const { token, username, logo } = this.props.profile || {};
        return (
            <div className='user-infos'>
                <div
                    className='user-infos-image'
                    style={{ backgroundImage: `url(${logo})` }}
                />
                <div className='user-infos-name'>
                    <div className='user-infos-name-welcome'>
                        {translate('label.loginWelcome')}
                    </div>
                    <div className='user-infos-name-value'>
                        {username}
                    </div>
                </div>
                <button
                    className='user-infos-logout'
                    onClick={() => this.doLogout(token)}
                >
                    <i className='material-icons'>
                        {'power_settings_new'}
                    </i>
                </button>
            </div>
        );
    }
}

UserInfos.displayName = 'UserInfos';

export default UserInfos;
