import React from 'react';

import SideMenuHead from '@/components/app-side-menu/side-menu-head';
import SideMenuLinks from '@/components/app-side-menu/side-menu-links';

class AppSideMenu extends React.Component {
    state = {
    }

    render() {
        return (
            <div className='app-side-menu'>
                <SideMenuHead />
                <SideMenuLinks />
            </div>
        );
    }
}

AppSideMenu.displayName = 'AppSideMenu';

export default AppSideMenu;
