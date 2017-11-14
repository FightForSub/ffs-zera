import React from 'react';

class AppContent extends React.Component {
    state = {
    }

    render() {
        return (
            <div className='app-content'>
                {this.props.children}
            </div>
        );
    }
}

AppContent.displayName = 'AppContent';

export default AppContent;
