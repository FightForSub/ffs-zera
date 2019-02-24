import React from 'react'
import { Router, hashHistory } from 'react-router';

import Routes from './routes';

import { filterByRoles } from '@/utilities/router'
import UserProvider from '@/providers/user';
/**
 * Root component of the application.
 * @returns {any} the root component of the application
 */
const Application = () => (
    <UserProvider>
        <Router
            history={hashHistory}
            routes={filterByRoles(Routes)}
        />
    </UserProvider>
);

export default Application;