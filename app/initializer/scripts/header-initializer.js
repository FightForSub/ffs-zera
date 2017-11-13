import React from 'react';
import dispatcher from 'focus-core/dispatcher';
import { translate } from 'focus-core/translation';

const WebsiteTitle = () => (<h3 className='custom-font website-title'>{translate('website.title')}</h3>);
export default () => {
    console.info('|--- HEADER');
    dispatcher.handleViewAction({
        data: {
            summaryComponent: {
                component: WebsiteTitle
            }
        },
        type: 'update'
    });
    console.info('   |--- Header correctly initialized.');
}
