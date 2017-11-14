import React from 'react';

import SideMenuHead from '@/components/app-side-menu/side-menu-head';

class AppSideMenu extends React.Component {
    state = {
    }

    render() {
        return (
            <div className='app-side-menu'>
                <SideMenuHead />
            </div>
        );
    }
}

AppSideMenu.displayName = 'AppSideMenu';

export default AppSideMenu;
