import React from 'react';
import Layout from 'focus-components/components/layout';

import MenuLeft from '../views/menu/menu-left';
//  import Footer from '../views/footer';

const CustomLayout = (props) => (
    <div>
        <Layout
            MenuLeft={MenuLeft}
        >
            {props.children}
        </Layout>
    </div >
);
CustomLayout.displayName = 'CustomAppLayout';

export default CustomLayout;