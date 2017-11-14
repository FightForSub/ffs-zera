import React from 'react';

import AppSideMenu from '@/components/app-side-menu';
import AppContent from '@/components/app-content';

const CustomLayout = (props) => (
    <div className='app-layout'>
        <AppSideMenu />
        <AppContent>
            {props.children}
        </AppContent>
    </div >
);
CustomLayout.displayName = 'CustomAppLayout';

export default CustomLayout;