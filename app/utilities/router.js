import { browserHistory as history } from 'react-router'
import { createRoutes } from 'react-router/lib/RouteUtils'
import { hasRole } from 'focus-core/user'

const navigate = url => history.push(`${__BASE_URL__}${url ? url : ''}`);

const filterByRoles = routes => {
    return createRoutes(routes).reduce((acc, current, index, array) => {
        if (current.roles && !hasRole(current.roles)) {
            return acc;
        }
        const currentRoute = current;
        if (currentRoute.childRoutes) {
            currentRoute.childRoutes = filterByRoles(currentRoute.childRoutes)
        }
        return [...acc, currentRoute];
    }
        , []);
};

export {
    navigate,
    filterByRoles
}
