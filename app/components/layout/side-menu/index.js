import { Component } from 'react';
import React, { Component } from 'react';
import { translate } from 'focus-core/translation';

class Layout extends Component {
    state = {
        isVisible: false
    }

    render() {
        const { title, children } = this.props;
        return (
            <side-menu-logo>
                );
    }
}

Layout.displayName = 'Layout';
Layout.propTypes = {

                };
Layout.defaultProps = {

                };

export default Layout;
