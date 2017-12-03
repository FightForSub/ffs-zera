import React from 'react';
import { translate } from 'focus-core/translation';

const NoEventItem = () => {
    return (
        <div className='no-event-item'>
            {translate('events.paragraphs.noEventItem')}
        </div>
    );
};

export default NoEventItem;
