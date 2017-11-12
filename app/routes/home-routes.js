import React from 'react';
import StatsView from '../views/stats';
import LiveView from '../views/live';
import DetailView from '../views/events/detail';

import ParticipantView from '../views/participants';
import InscriptionView from '../views/inscription';
import EventsView from '../views/events';

const routes = [
    {
        path: 'stats',
        component: StatsView
    },
    {
        path: 'live',
        component: LiveView
    },
    {
        path: 'participants',
        component: ParticipantView
    },
    {
        path: 'events',
        component: EventsView
    },
    {
        path: 'event/:id',
        component: DetailView
    },
    {
        path: 'inscription',
        component: () => (<InscriptionView hasLoad={false} isEdit />)
    }

];

export default routes; 
