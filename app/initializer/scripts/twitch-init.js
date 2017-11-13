import { dispatchData } from 'focus-core/dispatcher';

export default () => {
    console.info('|--- TWITCH');

    Twitch.init({ clientId: __CLIENT_ID__ }, (error, { scope, token, authenticated }) => {
        if (error) {
            console.log(error);
        }

        if (authenticated) {
            dispatchData('profile', { scope, token });
        }
        console.info('   |--- Twitch correctly initialized.');
    });
}
