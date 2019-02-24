import React from 'react';

import SideMenuHead from '@/components/app-side-menu/side-menu-head';
import SideMenuLinks from '@/components/app-side-menu/side-menu-links';
import SideMenuFooter from '@/components/app-side-menu/side-menu-footer';

function AppSideMenu() {
    return (
        <div className='app-side-menu'>
            <SideMenuHead />
            <SideMenuLinks />
            <SideMenuFooter />
        </div>
    );
}


export default AppSideMenu;
