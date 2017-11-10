import React from 'react';
import { browserHistory as history } from 'react-router';
import CoreStore from 'focus-core/store/CoreStore';
import FocusDevTools from 'focus-devtools';
const DevTools = props => {
    return (
        <FocusDevTools
            isPanel /* If you want to embed the component in a DOck */
            toggleVisibilityKey='ctrl-m' /*How do you want to display the dev tool*/
            routes={history.handlers} /* A list of all your routes (`focus-core/router/history`)*/
            getStores={() => CoreStore.prototype._instances} /* A list of all your stores (`focus-core/CoreStore._instances`)*/
            isDebugDevTools={false}
        />
    );
} 

DevTools.displayName = 'DevTools';

export default DevTools; 
