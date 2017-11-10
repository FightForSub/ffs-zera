import React from 'react'
import { Router, browserHistory } from 'react-router';

import Routes from './routes';

import { filterByRoles } from './utilities/router'

/**
 * Root component of the application.
 * @returns {any} the root component of the application
 */
const Application = () => (
    <Router
        history={browserHistory}
        routes={filterByRoles(Routes)}
    />
);

export default Application;