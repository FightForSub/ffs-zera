import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader';
import { registerPreFetchTransform } from 'focus-core/network/api-driver';
import UserStore from 'focus-core/user/built-in-store';
import { configure } from 'focus-core/network/config';

import { initialize as beforeInit } from './initializer/before';
import { initialize as afterInit } from './initializer/after';
import Application from './application';
import errorHandling from './utilities/error-handling';

registerPreFetchTransform(({ urlData, data, options }) => {
    options = options || {};
    options.headers = options.headers || {};
    options.headers.Authorization = options.headers.Authorization || (UserStore.getProfile() || {}).apiToken;
    return { urlData, data, options };
});

configure({ xhrErrors: errorHandling });
// Flag to know if DOM was loaded
document.addEventListener('DOMContentLoaded', () => { window._hasFiredDOMContentLoaded = true; });

/**
 * Render the whole application inside the app container for hot reload.
 * See point 3b http://gaearon.github.io/react-hot-loader/getstarted/#step-3-of-3-adding-react-hot-loader-to-preserve-component-state
 * 
 * @param {any} Component the root of the application
 */
const renderApplication = Component => {
    render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementsByClassName(`${__ANCHOR_CLASS__}`)[0]
    );
}

/**
 * Initialisation to do when DOM is loaded, then start the application (with the needed part for HOT_RELOAD)
 * 
 */
const onDOMContentLoaded = () => {
    afterInit();

    renderApplication(Application);

    if (module.hot) {
        module.hot.accept('./application', () => {
            renderApplication(Application)
        });
    }

};

// Initializers before DOM CONTENT LOADED
beforeInit();

window.onDOMContentLoaded = onDOMContentLoaded;
if (window._hasFiredDOMContentLoaded) {
    onDOMContentLoaded();
} else {
    document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
}

//Reference styles inside the application
import './styles';
