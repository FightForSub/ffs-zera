import { Component } from 'react';

class AppLogo extends Component {
    state = {
    }

    render() {
        return (
            <div>
                <img
                    src='assets/img/logo_small.png'
                    alt="Fight For Sub's logo"
                    title="Fight For Sub's logo"
                />
            </div>
        );
    }
}

AppLogo.displayName = 'AppLogo';

export default AppLogo;
