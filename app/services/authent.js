import authApiDriver from '@/config/server/authent';

export default {
    login(token) {
        return authApiDriver.login(null, { twitch_token: token });
    },
    getCurrentUser(accessToken) {
        return authApiDriver.getCurrentUser(null, null, { headers: { Authorization: accessToken } });
    }
}

