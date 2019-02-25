import React from 'react'
import { Router, hashHistory } from 'react-router';

import Routes from './routes';

import { filterByRoles } from '@/utilities/router'
import UserProvider from '@/providers/user';
import DomainProvider from '@/providers/domain';
import EntityProvider from '@/providers/entity';
/**
 * Root component of the application.
 * @returns {any} the root component of the application
 */
const Application = () => (
    <UserProvider>
        <DomainProvider>
            <EntityProvider>
                <Router
                    history={hashHistory}
                    routes={filterByRoles(Routes)}
                />
            </EntityProvider>
        </DomainProvider>
    </UserProvider>
);

export default Application;