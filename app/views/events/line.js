import React from 'react';
import { mixin as lineMixin } from 'focus-components/list/selection/line';

export default React.createClass({
    displayName: 'EventLineView',
    mixins: [lineMixin],
    definitionPath: 'event',
    /** @inheritDoc */
    renderLineContent({ status, reservedToAffiliates, reservedToPartners, current }) {
        return (
            <div data-app='line-event'>
                <i className='material-icons'>{status === 'OPEN' ? 'event_available' : status === 'STARTED' ? 'event_seat' : 'event_busy'}</i>
                {this.fieldFor('name')}
                {this.fieldFor('description')}
                {this.fieldFor('reservedToAffiliates', { value: '' + reservedToAffiliates })}
                {this.fieldFor('reservedToPartners', { value: '' + reservedToPartners })}
                {this.fieldFor('current', { value: '' + current })}
                {this.fieldFor('status')}
            </div>
        );
    }
});
//OPEN, CLOSED, STARTED, ENDED
// {"id":3,"name":"TestName","description":"TestDesc","reservedToAffiliates":false,"reservedToPartners":false,"status":"OPEN","current":false}
