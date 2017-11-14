import React from 'react';
import Layout from 'focus-components/components/layout';

import AppSideMenu from './app-side-menu';
import AppContent from './app-side-menu';
import MenuLeft from '../views/menu/menu-left';
//  import Footer from '../views/footer';

const CustomLayout = (props) => (
    <div>
        <AppSideMenu />
        <AppContent />
        {/* <Layout
            MenuLeft={MenuLeft}
        >
            {props.children}
        </Layout> */}
    </div >
);
CustomLayout.displayName = 'CustomAppLayout';

export default CustomLayout;