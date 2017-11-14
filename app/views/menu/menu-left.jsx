import React from 'react';
import { navigate } from 'focus-core/history';
import Menu from 'focus-components/components/menu';
import { component as Modal } from 'focus-components/application/popin';
import Link from '../../components/router/link';
import LoginButton from '../../components/login';
import { translate } from 'focus-core/translation';
//custom web component
// import QuickSearchView from '../search/quick';

/**
 * Composant pour le menu gauche
 * 
 * @class DemoMenuLeft
 * @extends {Component} Composant React
 */
class DemoMenuLeft extends React.Component {
    constructor(props) {
        super(props);
        this._onHomeClick = this._onHomeClick.bind(this);
    }

    _getMenuItems() {
        return [
            { icon: 'live_tv', route: 'live', name: translate('label.livePage') },
            { icon: 'event', route: 'events', name: translate('label.eventListPage') }
            // { icon: 'add_circle', route: 'inscription', name: translate('label.inscriptionPage') }
        ];
    }

    _onHomeClick() {
        navigate('home');
    }

    render() {
        const items = this._getMenuItems();
        // const { isQuickSearchModalOpen } = this.state;
        return (
            <div>
                <Menu LinkComponent={Link} items={items} handleBrandClick={this._onHomeClick}>
                    <LoginButton />
                </Menu>
            </div>
        );
    }
}

export default DemoMenuLeft;