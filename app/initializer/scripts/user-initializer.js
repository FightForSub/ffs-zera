import dispatcher from 'focus-core/dispatcher';
import { builtInStore as UserStore } from 'focus-core/user';

import configServices from '../../services/config';

import { once } from 'lodash';


const initialize = (appInitialisation) => {
    console.info('|--- USER');
    configServices.loadUser().then(
        (data) => {
            console.info('   |--- User loaded');

            UserStore.addProfileChangeListener(once(appInitialisation));

            dispatcher.handleServerAction({
                data: {
                    profile: data.profile,
                    roles: data.roles,
                    login: data.login
                },
                type: 'update'
            });
        }
    );
};

export {
    initialize
};
