// import 'babel-preset-focus/dist/focus-polyfill';
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader';

import { initialize as appConfigInitialize } from './initializer/scripts/app-configuration-initializer';
import { initialize as userInitialize } from './initializer/scripts/user-initializer';
import { initialize as beforeInit } from './initializer/before';
import { initialize as afterInit } from './initializer/after';

import Application from './application';

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
    const info = console.info;
    afterInit();
    info('#########################[START APP]############################');

    renderApplication(Application);

    if (module.hot) {
        module.hot.accept('./application', () => {
            renderApplication(Application)
        });
    }

    info('#########################[APP STARTED]##########################');
};


/**
 * Initialisation of the application : first the initialisers that don't need the DOM, then the others.
 * 
 */
const appInit = () => {
    // initializers before DOM CONTENT LOADED
    beforeInit();

    window.onDOMContentLoaded = onDOMContentLoaded;
    if (window._hasFiredDOMContentLoaded) {
        onDOMContentLoaded();
    } else {
        document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
    }
};
console.log('[INITIALIZER - BEFORE ANYTHING (prerequisites)]');
// First we load the configuration of the application, then the conf for the user, and only after we start the application
appConfigInitialize(() => userInitialize(appInit));

//Reference styles inside the application
import './styles/index.scss';
