import React, { Component } from 'react';
import { translate } from 'focus-core/translation';

class Layout extends Component {
    state = {
        isVisible: false
    }

    render() {
        const { title, children } = this.props;
        return (
            <section className='section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp'>
                <div className='mdl-card mdl-cell mdl-cell--12-col'>
                    <div className='mdl-card__supporting-text mdl-grid mdl-grid--no-spacing'>
                        <h1 className='mdl-cell mdl-cell--12-col'>{translate(title)}</h1>
                        {children}
                    </div>
                </div>
            </section >
        );
    }
}

Layout.displayName = 'Layout';
Layout.propTypes = {

};
Layout.defaultProps = {

};

export default Layout;
