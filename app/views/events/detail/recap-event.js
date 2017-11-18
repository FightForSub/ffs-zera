import React from 'react';
import { mixin as formPreset } from 'focus-components/common/form';
import { translate } from 'focus-core/translation';
import EventStore from '@/stores/event';
import eventActions from '@/action/event';

export default React.createClass({
    displayName: 'EventDetailView',
    mixins: [formPreset],
    definitionPath: 'event',
    action: {
        load: eventActions.load
    },
    stores: [
        {
            store: EventStore,
            properties: ['eventDetail']
        }
    ],
    componentWillUpdate(nextProps, nextState) {
        if (nextState.description !== this.state.description && this.refs['event.description']) {
            if (this.refs['event.description'].refs && this.refs['event.description'].refs.display && this.refs['event.description'].refs.display.forceChange) {
                this.refs['event.description'].refs.display.forceChange(nextState.description, 'markdown');
            }
        }
    },
    buildBooleanProps(fieldName) {
        return {
            value: this.state[fieldName] == null ? null : '' + this.state[fieldName],
            onChange: (value) => this.setState({ [fieldName]: (value === 'true' ? true : value === 'false' ? false : null) })
        }
    },

    /** @inheritDoc */
    renderContent() {
        return (
            <div data-app='live-page'>
                <h4 className='website-title'>{translate('label.recapEvent')}</h4>
                <div>
                    {this.fieldFor('name')}
                    {this.fieldFor('description')}
                    {this.fieldFor('status')}
                    {this.fieldFor('reservedToAffiliates', this.buildBooleanProps('reservedToAffiliates'))}
                    {this.fieldFor('reservedToPartners', this.buildBooleanProps('reservedToPartners'))}
                    {this.fieldFor('current', this.buildBooleanProps('current'))}
                </div>
            </div>
        );
    }
});