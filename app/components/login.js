import React from 'react';
// import Button from 'focus-components/components/button';
import connectToStore from 'focus-components/behaviours/store/connect';
import UserStore from 'focus-core/user/built-in-store';
import { dispatchData } from 'focus-core/dispatcher';
import localForage from 'localforage';
import moment from 'moment';

import TwitchButton from '@/components/login/twitch-button';
import UserInfos from '@/components/login/user-infos';
import authService from '@/services/authent';

@connectToStore([{
    store: UserStore,
    properties: ['profile', 'login', 'roles']
}], () => UserStore.getValue())
class LoginButton extends React.Component {
    constructor(props) {
        super(props);
    }

    handleAuthLogin(twitchToken) {
        let apiToken;
        localForage.getItem('api_token')
            .then(token => {
                if (token !== null && (token.expiration_date - 3600 * 2) > moment().unix()) {
                    return token;
                }
                return authService.login(this.props.profile.token);
            }).then(({ access_token, expires_in, expiration_date }) => {
                localForage.setItem('api_token', { access_token, expires_in, expiration_date: expiration_date ? expiration_date : (moment().unix() + expires_in) });
                apiToken = access_token;
                // dispatchData('profile', { ...UserStore.getProfile(), apiToken: access_token });
                return authService.getCurrentUser(access_token);
            }).then(data => {
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
            return (<div className='login-container'>
                <div className='user-infos user-infos-loading'>
                    <div
                        className='user-infos-image'
                    />
                    <div className='user-infos-name'>
                        <div className='user-infos-name-welcome' />
                        <div className='user-infos-name-value' />
                    </div>
                </div>
            </div>)
        }

        return (
            <UserInfos />
        );

    }
}

LoginButton.displayName = 'LoginButton';
export default LoginButton;