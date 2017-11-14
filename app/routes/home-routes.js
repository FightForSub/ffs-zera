import React from 'react';
import StatsView from '@/views/stats';
import LiveView from '@/views/live/new-live';
import DetailView from '@/views/events/detail';

// import ParticipantView from '@/views/participants';
// import InscriptionView from '@/views/inscription';
import EventsView from '@/views/events';
import HomeView from '@/views/home';

const routes = [
    {
        path: 'home',
        component: HomeView
    },
    // {
    //     path: 'stats',
    //     component: StatsView
    // },
    {
        path: 'live',
        component: LiveView
    },
    // {
    //     path: 'participants',
    //     component: ParticipantView
    // },
    {
        path: 'events',
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
        path: ':token',
        indexRoute: {
            onEnter: ({ params }, replace) => {
                replace(`${__BASE_URL__}home`);
            }
        }
    }

    // {
    //     path: 'inscription',
    //     component: () => (<InscriptionView hasLoad={false} isEdit />)
    // }

];

export default routes; 
