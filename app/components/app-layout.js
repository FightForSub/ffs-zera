import React from 'react';

import AppSideMenu from '@/components/app-side-menu';
import AppContent from '@/components/app-content';
import DevTools from '@/components/dev-tools';
import LoadingBar from 'focus-components/components/layout/header-loading-bar';
import ConfirmWrapper from 'focus-components/components/confirm';

const CustomLayout = (props) => (
    <div className='app-layout'>
        <LoadingBar />
        <AppSideMenu />
        <AppContent>
            {props.children}
        </AppContent>
        {__DEV__ && <DevTools />}
        <ConfirmWrapper />
    </div >
);
CustomLayout.displayName = 'CustomAppLayout';

export default CustomLayout;