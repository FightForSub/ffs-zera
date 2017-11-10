import React from 'react';
import dispatcher from 'focus-core/dispatcher';
import { translate } from 'focus-core/translation';
// import NotificationCenter from 'focus-notifications';

export default () => {
    console.info('|--- HEADER');

    //initialize account/notification

    dispatcher.handleViewAction({
        data: {
            // barContentLeftComponent: { component: (props) => <div>Empty</div> },
            summaryComponent: {
                component: () => (<h3 className='custom-font website-title'>{translate('website.title')}</h3>)
            },
            barContentRightComponent: {
                component: (props) => {
                    return <img src='https://camo.githubusercontent.com/e3dadf5d1f371961805e6843fc7d9d611a1d14b5/687474703a2f2f7474762d6170692e73332e616d617a6f6e6177732e636f6d2f6173736574732f636f6e6e6563745f6461726b2e706e67' className='twitch-connect' href='#' id='TwitchButton' />
                }
            }
        },
        type: 'update'
    });
}
