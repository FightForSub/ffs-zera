import React from 'react';
import { locale } from 'moment';
import localeForage from 'localforage';
import { addErrorMessage } from 'focus-core/message';
import { dispatchData } from 'focus-core/dispatcher';

import StatsView from '@/views/stats';
import LiveView from '@/views/live/new-live';
import DetailView from '@/views/events/detail';

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
        path: ':token',
        indexRoute: {
            onEnter: ({ params }, replace) => {
                if (params.token) {
                    const twitchResponse = params.token.split('&').reduce((acc, elt) => {
                        const [key, value] = elt.split('=');
                        acc[key] = value;
                        return acc;
                    }, {});

                    localeForage.getItem('nonce').then(nonce => {
                        const { scope, access_token: token, state } = twitchResponse;
                        if (state !== nonce) {
                            addErrorMessage('error.twitchAuth');
                            localeForage.clear();
                        } else {
                            dispatchData('profile', { scope, token });
                            localeForage.setItem('twitch_data', { token, scope });
                        }
                    })
                    replace(`${__BASE_URL__}home`);
                }
            }
        }
    }

];

export default routes; 
