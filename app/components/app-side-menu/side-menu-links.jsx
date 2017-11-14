import React from 'react';
import { Link } from 'react-router';
import { translate } from 'focus-core/translation';

class SideMenuLinks extends React.Component {
    state = {
    }

    _getMenuItems() {
        return [
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
            // { icon: 'add_circle', route: 'inscription', name: translate('label.inscriptionPage') }
        ];
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
