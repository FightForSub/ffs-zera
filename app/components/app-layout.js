import React from 'react';

import AppSideMenu from '@/components/app-side-menu';
import SideMenuFooter from '@/components/app-side-menu/side-menu-footer';
import AppContent from '@/components/app-content';
import DevTools from '@/components/dev-tools';
import LoadingBar from 'focus-components/components/layout/header-loading-bar';
import ConfirmWrapper from 'focus-components/components/confirm';
import MessageCenter from 'focus-components/components/message-center';

const CustomLayout = (props) => (
    <div className='app-layout'>
        <LoadingBar />
        <AppSideMenu />
        <AppContent>
            {props.children}
        </AppContent>
        <SideMenuFooter />
        {__DEV__ && <DevTools />}
        <ConfirmWrapper />
        <MessageCenter />
    </div >
);
CustomLayout.displayName = 'CustomAppLayout';

export default CustomLayout;