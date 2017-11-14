import React from 'react';

class AppContent extends React.Component {
    state = {
    }

    render() {
        return (
            <div className='app-content'>
                <div className='app-content-header' />
                <div className='app-content-content'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

AppContent.displayName = 'AppContent';

export default AppContent;
