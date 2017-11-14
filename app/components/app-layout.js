import React from 'react';

import AppSideMenu from './app-side-menu';
import AppContent from './app-content';

const CustomLayout = (props) => (
    <div className='app-layout'>
        <AppSideMenu />
        <AppContent>
            {props.children}
        </AppContent>
        {/* <Layout
            MenuLeft={MenuLeft}
        >
            {props.children}
        </Layout> */}
    </div >
);
CustomLayout.displayName = 'CustomAppLayout';

export default CustomLayout;