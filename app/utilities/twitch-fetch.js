import fetch from 'focus-core/network/fetch';
import UserStore from 'focus-core/user/built-in-store';

export default (fetchData, options) => {
    const newOptions = { ...options };
    newOptions.headers = (options || {}).headers || {};
    newOptions.headers['Client-ID'] = __CLIENT_ID__;
    newOptions.headers.Authorization = 'OAuth ' + (UserStore.getProfile() || {}).token;
    return fetch(fetchData, newOptions);
}