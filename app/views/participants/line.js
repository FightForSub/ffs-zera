import React from 'react';
import { mixin as lineMixin } from 'focus-components/list/selection/line';

export default React.createClass({
    displayName: 'ParticipantLineView',
    mixins: [lineMixin],
    definitionPath: 'participant',
    /** @inheritDoc */
    renderLineContent({ alias, id }) {
        return (
            <div data-app='line-participant'>
                <div>{this.fieldFor('alias')}</div>
            </div>
        );
    }
});
