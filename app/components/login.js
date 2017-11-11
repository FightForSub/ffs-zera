import React, { Component } from 'react';
import Button from 'focus-components/components/button';
import connectToStore from 'focus-components/behaviours/store/connect';
import UserStore from 'focus-core/user/built-in-store';
import twitchFetch from '../utilities/twitch-fetch';
import { dispatchData } from 'focus-core/dispatcher';


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
            this.loadProfil(this.props.profile);
        }
    }

    loadProfil(profile) {
        twitchFetch({ url: 'https://api.twitch.tv/kraken/user', method: 'GET' }).then(data => {
            dispatchData('profile', { ...data, scope: profile.scope, token: profile.token });
        }).catch(error => console.error(error));
    }

    componentWillReceiveProps({ profile }) {
        if (profile && profile.token && (!this.props.profile || !this.props.profile.token)) {
            this.loadProfil(profile);
        }
    }

    /** @inheritDoc */
    render() {
        // <img src='http://ttv-api.s3.amazonaws.com/assets/connect_dark.png' className='twitch-connect' href='#' onClick={this.doLogin} />
        const { token, display_name, email, logo } = this.props.profile || {};
        if (!token) {
            return (
                <div className='login-container'>
                    <div className='login-button' onClick={this.doLogin} />
                </div>
            );
        }

        if (token && !display_name) {
            return <div className='login-container'>{'Loading'}</div>
        }

        return (<div className='login-container'>
            <div className='logo-login' style={{ backgroundImage: `url(${logo}` }} />
            <div>{display_name}</div>
            <i className='material-icons' onClick={() => this.doLogout(token)}>{'power_settings_new'}</i>
        </div>);

    }
}

LoginButton.displayName = 'LoginButton';
export default LoginButton;