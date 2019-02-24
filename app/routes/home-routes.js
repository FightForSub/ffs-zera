import React, { useContext, useEffect } from 'react';
import localeForage from 'localforage';
import { addErrorMessage } from 'focus-core/message';
import { dispatchData } from 'focus-core/dispatcher';

import { UserContext } from '@/providers/user';
import { navigate } from '@/utilities/router';

import StatsView from '@/views/stats';
import LiveView from '@/views/live/new-live';
import DetailView from '@/views/events/detail';
import ConfirmationView from '@/views/confirmation'

import InscriptionView from '@/views/inscription';
import EventsView from '@/views/events';
import HomeView from '@/views/home';
const routes = [
    {
        path: 'home',
        component: HomeView
    },
    {
        path: 'live',
        component: LiveView,
        onEnter: () => {
            dispatchData('eventDetail', null);
            dispatchData('eventRoundList', null);
            dispatchData('eventRoundDetail', null);
        }
    },
    {
        path: 'events',
        component: EventsView
    },
    {
        path: 'myevents',
        component: (props) => (<EventsView userOnly {...props} />),
        onEnter: () => {
            dispatchData('eventList', null);
        }
    },
    {
        path: 'event/:id',
        component: (props) => (<DetailView {...props} hasForm={false} />)
    },
    {
        path: 'event/:id/results',
        component: StatsView
    },
    {
        path: 'inscription',
        component: () => (<InscriptionView hasLoad={false} isEdit />)
    },
    {
        path: 'confirmation/:id/:token',
        component: ({ params }) => <ConfirmationView id={params.id} token={params.token} />
    },
    {
        path: ':token',
        indexRoute: {
            // onEnter: ({ params }, replace) => {
            //     if (params.token) {
            //         const twitchResponse = params.token.split('&').reduce((acc, elt) => {
            //             const [key, value] = elt.split('=');
            //             acc[key] = value;
            //             return acc;
            //         }, {});

            //         localeForage.getItem('nonce').then(nonce => {
            //             const { scope, access_token: token, state } = twitchResponse;
            //             if (state !== nonce) {
            //                 addErrorMessage('error.twitchAuth');
            //                 localeForage.clear();
            //             } else {
            //                 dispatchData('profile', { scope, token });
            //                 localeForage.setItem('twitch_data', { token, scope });
            //             }
            //         })
            //         replace(`${__BASE_URL__}home`);
            //     }
            // },
            component: ({ params }) => {
                const { dispatchUser } = useContext(UserContext);

                useEffect(() => {
                    // console.log('params', params.token, profile, dispatchUser);
                    if (params.token) {
                        const twitchResponse = params.token.split('&').reduce((acc, elt) => {
                            const [key, value] = elt.split('=');
                            acc[key] = value;
                            return acc;
                        }, {});

                        localeForage.getItem('nonce').then(nonce => {
                            const { scope, access_token: token, state } = twitchResponse;
                            if (state !== nonce) {
                                dispatchUser({ type: 'reset' });
                                addErrorMessage('error.twitchAuth');
                                localeForage.clear();
                            } else {
                                dispatchUser({ type: 'merge', payload: { scope, token } });
                                dispatchData('profile', { scope, token });
                                localeForage.setItem('twitch_data', { token, scope });
                            }
                        })
                        navigate('home')
                        // replace(`${__BASE_URL__}home`);
                    }

                }, [params.token]);
                return null;
            }
        }
    }

];

export default routes; 
