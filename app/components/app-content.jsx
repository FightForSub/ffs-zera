import React from 'react';

function AppContent({ children }) {
    return (
        <div className='app-content'>
            <div className='app-content-header' />
            <div className='app-content-content'>
                {children}
            </div>
        </div>
    );
}


export default AppContent;
