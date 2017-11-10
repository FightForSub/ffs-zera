import fetch from 'focus-core/network/fetch';
//import configUrl from '../config/server/config';

export default {
    loadConfig() {
        console.log(`[CONFIG] call loadConfig method. `);
        return Promise.resolve({});
        // return configApiDriver.loadConfig();
    },
    loadUser() {
        console.log(`[CONFIG] call loadUser method. `);
        return Promise.resolve({
            profile: {},
            roles: [],
            login: undefined
        });
        // return configApiDriver.loadUser();
    }
}
