import authApiDriver from '../config/server/authent';

export default {
    login(token) {
        return authApiDriver.login(null, { twitch_token: token });
    }
}

