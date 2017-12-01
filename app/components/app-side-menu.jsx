import React from 'react';

import SideMenuHead from '@/components/app-side-menu/side-menu-head';
import SideMenuLinks from '@/components/app-side-menu/side-menu-links';
import SideMenuFooter from '@/components/app-side-menu/side-menu-footer';

class AppSideMenu extends React.Component {
    state = {
    }

    render() {
        return (
            <div className='app-side-menu'>
                <SideMenuHead />
                <SideMenuLinks />
                <SideMenuFooter />
            </div>
        );
    }
}

AppSideMenu.displayName = 'AppSideMenu';

export default AppSideMenu;
