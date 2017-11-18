import React from 'react';
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
        component: LiveView
    },
    {
        path: 'events',
        component: EventsView
    },
    {
        path: 'myevents',
        component: EventsView
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
                replace(`${__BASE_URL__}home`);
            }
        }
    }

];

export default routes; 
