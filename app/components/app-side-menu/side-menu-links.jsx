import React from 'react';
import { Link } from '@/components/router';
import { translate } from 'focus-core/translation';
// import UserStore from 'focus-core/user/built-in-store';
// import connectToStore from 'focus-components/behaviours/store/connect';
// import { isAuthenticated } from '@/utilities/check-rights';

import { useIsAuthenticated } from '@/hooks/access';

function getMenuItems(isAuth) {
    const items = [
        {
            icon: 'live_tv',
            route: 'live',
            name: translate('label.livePage')
        },
        {
            icon: 'event',
            route: 'events',
            name: translate('label.eventListPage')
        }
    ];

    if (isAuth) {
        items.push(
            {
                icon: 'dashboard',
                route: 'myevents',
                name: translate('label.myEventsPage')
            },
            {
                icon: 'add_circle',
                route: 'inscription',
                name: translate('label.inscriptionPage')
            });
    }
    return items;
}

// @connectToStore([{
//     store: UserStore,
//     properties: ['profile']
// }], () => {
//     return {}
// })
function SideMenuLinks() {
    const isAuth = useIsAuthenticated();
    const items = getMenuItems(isAuth)
        .map((link, i) => {
            return (
                <li
                    key={i}
                >
                    <Link
                        to={link.route}
                        className='side-menu-link'
                    >
                        <i className='material-icons'>
                            {link.icon}
                        </i>
                        <span>
                            {link.name}
                        </span>
                    </Link>
                </li>
            );
        });

    return (
        <nav className='side-menu-links'>
            <ul>
                {items}
            </ul>
        </nav>
    );
}

export default SideMenuLinks;
