import React from 'react';
import logo from '@/styles/assets/img/logo_small.png';

class AppLogo extends React.Component {
    state = {
    }

    render() {
        return (
            <img
                src={logo}
                alt="Fight For Sub's logo"
                title="Fight For Sub's logo"
            />
        );
    }
}

AppLogo.displayName = 'AppLogo';

export default AppLogo;
