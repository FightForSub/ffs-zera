import React from 'react';
import StatsView from '../views/stats';
import LiveView from '../views/live';
import ParticipantView from '../views/participants';
import InscriptionView from '../views/inscription';

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
        path: 'inscription',
        component: () => (<InscriptionView hasLoad={false} isEdit />)
    }

];

export default routes; 
