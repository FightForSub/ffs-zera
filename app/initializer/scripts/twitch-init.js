import { dispatchData } from 'focus-core/dispatcher';
import localForage from 'localforage';
import twitchFetch from '@/utilities/twitch-fetch';

export default () => {
    console.info('|--- TWITCH');
    localForage.getItem('twitch_data').then(data => {
        if (data) {
            const { token, scope } = data;
            twitchFetch({ url: 'https://api.twitch.tv/kraken', method: 'GET' }, { headers: { Authorization: `OAuth ${token}` } }).then(response => {
                if (response && response.token && response.token.valid) {
                    dispatchData('profile', { scope, token });
                } else {
                    localForage.clear();
                    dispatchData('profile', null);
                }
            }).catch(error => {
                localForage.clear();
                dispatchData('profile', null);
            });
        }
    });
};
