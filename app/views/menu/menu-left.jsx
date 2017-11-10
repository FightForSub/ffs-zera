import React, { Component } from 'react';
import { navigate } from 'focus-core/history';
import Menu from 'focus-components/components/menu';
import { component as Modal } from 'focus-components/application/popin';
import Link from '../../components/router/link';
//custom web component
// import QuickSearchView from '../search/quick';

/**
 * Composant pour le menu gauche
 * 
 * @class DemoMenuLeft
 * @extends {Component} Composant React
 */
class DemoMenuLeft extends Component {
    constructor(props) {
        super(props);
        this._onHomeClick = this._onHomeClick.bind(this);
    }

    _getMenuItems() {
        return [
            { icon: 'live_tv', route: 'live' },
            { icon: 'add_circle', route: 'inscription', title: 'inscription' },
            { icon: 'people', route: 'participants' },
            { icon: 'insert_chart', route: 'stats' }
        ];
    }

    _onHomeClick() {
        navigate('live');
    }

    render() {
        const items = this._getMenuItems();
        // const { isQuickSearchModalOpen } = this.state;
        return (
            <div>
                <Menu LinkComponent={Link} items={items} handleBrandClick={this._onHomeClick} />
            </div>
        );
    }
}

export default DemoMenuLeft;