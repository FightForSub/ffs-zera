import React from 'react';
import { Link } from '@/components/router';
import { translate } from 'focus-core/translation';

const NoEvents = () => {
    return (
        <div className='events-empty-state'>
            <h2 className='subheading'>
                {translate('events.titles.noEvent')}
            </h2>
            <p>
                {translate('events.paragraphs.noEvent')}
            </p>
            <Link to='inscription' className='button bordered green'>
                {translate('events.buttons.signInEvent')}
            </Link>
        </div>
    );
};

export default NoEvents;