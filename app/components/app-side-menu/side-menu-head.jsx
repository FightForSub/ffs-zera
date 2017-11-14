import React from 'react';
import { Link } from '@/components/router';

import AppLogo from '@/components/app-side-menu/app-logo';
import LoginButton from '@/components/login';

class SideMenuHead extends React.Component {
    state = {
    }

    render() {
        return (
            <div className='side-menu-head'>
                <div className='side-menu-head-logo'>
                    <Link>
                        <AppLogo />
                    </Link>
                </div>
                <LoginButton />
            </div>
        );
    }
}

SideMenuHead.displayName = 'SideMenuHead';

export default SideMenuHead;
