import { Component } from 'react';

import AppLogo from './app-side-menu/app-logo';
import SideMenuHead from './app-side-menu/side-menu-head';

class AppSideMenu extends Component {
    state = {
    }

    render() {
        return (
            <div>
                <AppLogo />
                <AppLogo />
            </div>
        );
    }
}

AppSideMenu.displayName = 'AppSideMenu';

export default AppSideMenu;
