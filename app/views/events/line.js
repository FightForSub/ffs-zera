import React from 'react';
import { mixin as lineMixin } from 'focus-components/list/selection/line';

export default React.createClass({
    displayName: 'EventLineView',
    mixins: [lineMixin],
    definitionPath: 'event',
    /** @inheritDoc */
    renderLineContent({ status, reservedToAffiliates, reservedToPartners, current }) {
        // {this.fieldFor('description')}        
        return (
            <div data-app='line-event'>
                <i className='material-icons'>{status === 'OPEN' ? 'event_available' : status === 'STARTED' ? 'event_seat' : 'event_busy'}</i>
                {this.fieldFor('name')}
                {this.fieldFor('reservedToAffiliates', { hasLabel: true, value: '' + reservedToAffiliates })}
                {this.fieldFor('reservedToPartners', { hasLabel: true, value: '' + reservedToPartners })}
                {this.fieldFor('current', { hasLabel: true, value: '' + current })}
                {this.fieldFor('status')}
            </div>
        );
    }
});
