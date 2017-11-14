import React, { Component } from 'react';
// import Button from 'focus-components/components/button';
import connectToStore from 'focus-components/behaviours/store/connect';
import UserStore from 'focus-core/user/built-in-store';
import { dispatchData } from 'focus-core/dispatcher';
import localForage from 'localforage';
import moment from 'moment';

import twitchFetch from '../utilities/twitch-fetch';
import authService from '../services/authent';

@connectToStore([{
    store: UserStore,
    properties: ['profile', 'login', 'roles']
}], () => UserStore.getValue())
class LoginButton extends Component {
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

    doLogout(token) {
        Twitch.logout(error => console.warn(error));
        localForage.clear();
        dispatchData('profile', null);

        // twitchFetch({ url: `https://api.twitch.tv/kraken/oauth2/revoke?client_id=${__CLIENT_ID__}&token=${token}`, method: 'POST' }).then(data => {
        //     dispatchData('profile', null);
        // }).catch(error => {
        //     console.error(error);
        //     dispatchData('profile', null);
        // });
    }

    componentWillMount() {
        if (this.props.profile && this.props.profile.token) {
            let twitchToken = this.props.profile.token;
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
    }

    loadProfil(profile) {

        return twitchFetch({ url: 'https://api.twitch.tv/kraken/user', method: 'GET' })
            .then(data => {
                dispatchData('profile', { ...data, scope: profile.scope, token: profile.token });
            });
    }

    componentWillReceiveProps({ profile }) {
        if (profile && profile.token && (!this.props.profile || !this.props.profile.token)) {
            let twitchToken = profile.token;
            let apiToken;
            authService.login(profile.token)
                .then(({ access_token }) => {
                    apiToken = access_token;
                    // dispatchData('profile', { ...UserStore.getProfile(), apiToken: access_token });
                    return authService.getCurrentUser(access_token);
                }).then(data => {
                    dispatchData('profile', { ...data, token: twitchToken, apiToken: apiToken });
                })
                .catch(error => console.warn('LOGIN ERROR', error));
        }
    }

    /** @inheritDoc */
    render() {
        // <img src='http://ttv-api.s3.amazonaws.com/assets/connect_dark.png' className='twitch-connect' href='#' onClick={this.doLogin} />
        const { token, username, email, logo } = this.props.profile || {};
        if (!token) {
            return (
                <div className='login-container'>
                    <div className='login-button' onClick={this.doLogin} />
                </div>
            );
        }

        if (token && !username) {
            return <div className='login-container'>{'Loading'}</div>
        }

        return (<div className='login-container'>
            <div className='logo-login' style={{ backgroundImage: `url(${logo}` }} />
            <div>{username}</div>
            <i className='material-icons' onClick={() => this.doLogout(token)}>{'power_settings_new'}</i>
        </div>);

    }
}

LoginButton.displayName = 'LoginButton';
export default LoginButton;