import React, { useContext } from 'react';
// import connectToStore from 'focus-components/behaviours/store/connect';
// import UserStore from 'focus-core/user/built-in-store';
import { dispatchData } from 'focus-core/dispatcher';
import localForage from 'localforage';
import { translate } from 'focus-core/translation';
import fetch from 'focus-core/network/fetch';
import { navigate } from '@/utilities/router';

import { UserContext } from '@/providers/user';


function doLogout(token, dispatchUser) {
    if (token) {
        fetch({ url: `https://api.twitch.tv/kraken/oauth2/revoke?client_id=${__CLIENT_ID__}&token=${token}`, method: 'POST' })
            .catch(() => { });
    }
    localForage.clear();
    dispatchData('profile', null);
    dispatchUser({ type: 'reset' });
    navigate('home');
}


// @connectToStore([{
//     store: UserStore,
//     properties: ['profile', 'login', 'roles']
// }], () => UserStore.getValue())
function UserInfos() {
    const { profile, dispatchUser } = useContext(UserContext);
    const { token, username, logo } = profile || {};
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
                onClick={() => doLogout(token, dispatchUser)}
            >
                <i className='material-icons'>
                    {'power_settings_new'}
                </i>
            </button>
        </div>
    );
}


// UserInfos.displayName = 'UserInfos';

export default UserInfos;
