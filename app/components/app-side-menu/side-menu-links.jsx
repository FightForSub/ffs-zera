import React from 'react';
import { Link } from '@/components/router';
import { translate } from 'focus-core/translation';
import UserStore from 'focus-core/user/built-in-store';
import connectToStore from 'focus-components/behaviours/store/connect';
import { isAuthenticated } from '@/utilities/check-rights';

@connectToStore([{
    store: UserStore,
    properties: ['profile']
}], () => {
    return {}
})
class SideMenuLinks extends React.Component {
    state = {
    }

    _getMenuItems() {
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

        if (isAuthenticated()) {
            items.push({
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

    render() {
        const items = this._getMenuItems()
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
            <nav>
                <ul className='side-menu-links'>
                    {items}
                </ul>
            </nav>
        );
    }
}

SideMenuLinks.displayName = 'SideMenuLinks';

export default SideMenuLinks;
