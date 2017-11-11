import { dispatchData } from 'focus-core/dispatcher';

export default () => {
    Twitch.init({ clientId: __CLIENT_ID__ }, (error, status) => {
        if (error) {
            // error encountered while loading
            console.log(error);
        }
        // the sdk is now loaded

        if (status.authenticated) {
            const { scope, token } = status;
            console.log('logged', status)

            dispatchData('profile', { scope, token });
            // console.log('logged', status)
            // user is currently logged in
        }
    });
}
