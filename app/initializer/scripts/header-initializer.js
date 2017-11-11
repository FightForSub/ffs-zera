import React from 'react';
import dispatcher from 'focus-core/dispatcher';
import { translate } from 'focus-core/translation';
import LoginButton from '../../components/login';
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
                component: LoginButton
            }
        },
        type: 'update'
    });
}
