import React from 'react';
import HomeView from '../views/home';

const routes = [
    {
        path: 'home',
        component: HomeView
    },
    {
        path: 'admin',
        component: (() => <div><h2>{'Administration'}</h2></div>)
    }
];

export default routes; 
