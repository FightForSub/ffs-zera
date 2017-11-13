import React, { Component } from 'react';
import connectToStore from 'focus-components/behaviours/store/connect';
import UserStore from 'focus-core/user/built-in-store';
import { dispatchData } from 'focus-core/dispatcher';

@connectToStore([{
    store: UserStore,
    properties: ['profile', 'login', 'roles']
}], () => UserStore.getValue())
class UserInfos extends Component {
    doLogout() {
        Twitch.logout(error => console.warn(error));
        dispatchData('profile', null);
    }

    render() {
        const { token, username, logo } = this.props.profile || {};
        return (
            <div className='login-container'>
                <div
                    className='logo-login'
                    style={{ backgroundImage: `url(${logo}` }}
                />
                <div>
                    {username}
                </div>
                <i
                    className='material-icons'
                    onClick={() => this.doLogout(token)}
                >
                    {'power_settings_new'}
                </i>
            </div>
        );
    }
}

UserInfos.displayName = 'UserInfos';

export default UserInfos;
