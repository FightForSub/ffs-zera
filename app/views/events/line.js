import React from 'react';
import { mixin as lineMixin } from 'focus-components/list/selection/line';

export default React.createClass({
    displayName: 'EventLineView',
    mixins: [lineMixin],
    definitionPath: 'event',
    /** @inheritDoc */
    renderLineContent() {
        return (
            <div data-app='line-event'>
                <i className='material-icons'>{'event_available'}</i>
                <div>{this.fieldFor('name')}</div>
                <div>{this.fieldFor('date')}</div>
            </div>
        );
    }
});
