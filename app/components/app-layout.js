import React from 'react';
import Layout from 'focus-components/components/layout';

import MenuLeft from '../views/menu/menu-left';
import Footer from '../views/footer';
import DevTools from './dev-tools';

const CustomLayout = (props) => (
    <div>
        <Layout
            Footer={Footer}
            MenuLeft={MenuLeft}
        >
            {props.children}
        </Layout>
        {__DEV__ && <DevTools />}
    </div >
);
CustomLayout.displayName = 'CustomAppLayout';

export default CustomLayout;