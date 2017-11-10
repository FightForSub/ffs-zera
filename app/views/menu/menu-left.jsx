import React, { Component } from 'react';
import { navigate } from 'focus-core/history';
import Menu from 'focus-components/components/menu';
import { component as Modal } from 'focus-components/application/popin';

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
        this._onQuickSearchModalToggle = this._onQuickSearchModalToggle.bind(this);
        this._onAdminClick = this._onAdminClick.bind(this);
    }

    state = {
        isQuickSearchModalOpen: false
    }

    _getMenuItems() {
        return [
            { icon: 'home', onClick: this._onHomeClick },
            { icon: 'search', onClick: this._onQuickSearchModalToggle },
            { icon: 'build', onClick: this._onAdminClick }
        ];
    }

    _onHomeClick() {
        this._onMenuItemClick();
        navigate('home');
    }

    _onAdminClick() {
        this._onMenuItemClick();
        navigate('admin');
    }

    _onMenuItemClick() {
        this.setState({
            isQuickSearchModalOpen: false
        });
    }

    _onQuickSearchModalToggle() {
        const { isQuickSearchModalOpen } = this.state;
        this.setState({
            isQuickSearchModalOpen: !isQuickSearchModalOpen
        });
    }

    render() {
        const items = this._getMenuItems();
        // const { isQuickSearchModalOpen } = this.state;
        return (
            <div>
                <Menu onPopinClose={this._onQuickSearchModalToggle} items={items} handleBrandClick={this._onHomeClick} />
                {/* {isQuickSearchModalOpen &&
                    <div data-demo='quick-search-area'>
                        <Modal open type='from-menu'>
                            <QuickSearchView handleClosePopin={this._onQuickSearchModalToggle} />
                        </Modal>
                    </div>
                } */}
            </div>
        );
    }
}

export default DemoMenuLeft;