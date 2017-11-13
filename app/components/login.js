import React, { Component } from 'react';
// import Button from 'focus-components/components/button';
import connectToStore from 'focus-components/behaviours/store/connect';
import UserStore from 'focus-core/user/built-in-store';

import TwitchButton from './login/twitch-button';
import UserInfos from './login/user-infos';
import { dispatchData } from 'focus-core/dispatcher';

import authService from '../services/authent';

@connectToStore([{
    store: UserStore,
    properties: ['profile', 'login', 'roles']
}], () => UserStore.getValue())
class LoginButton extends Component {
    constructor(props) {
        super(props);
    }

    handleAuthLogin(twitchToken) {
        let apiToken;
        authService.login(this.props.profile.token)
            .then(({ access_token }) => {
                apiToken = access_token;
                // dispatchData('profile', { ...UserStore.getProfile(), apiToken: access_token });
                return authService.getCurrentUser(access_token);
            })
            .then(data => {
                dispatchData('profile', { ...data, token: twitchToken, apiToken: apiToken });
            })
            .catch(error => console.warn('LOGIN ERROR', error));
    }

    componentWillMount() {
        if (this.props.profile && this.props.profile.token) {
            this.handleAuthLogin(this.props.profile.token);
        }
    }

    componentWillReceiveProps({ profile }) {
        if (profile && profile.token && (!this.props.profile || !this.props.profile.token)) {
            this.handleAuthLogin(profile.token);
        }
    }

    /** @inheritDoc */
    render() {
        const { token, username } = this.props.profile || {};
        if (!token) {
            return (
                <TwitchButton />
            );
        }

        if (token && !username) {
            return <div className='login-container'>{'Loading'}</div>
        }

        return (
            <UserInfos />
        );

    }
}

LoginButton.displayName = 'LoginButton';
export default LoginButton;