import React from 'react';
import { mixin as formPreset } from 'focus-components/common/form';
import { translate } from 'focus-core/translation';
import EventStore from '../../../stores/event';
import eventActions from '../../../action/event';
// import Article from '../../components/article';
// import Section from '../../components/article';
import { navigate } from '../../../utilities/router';

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
    /** @inheritDoc */
    renderContent() {
        return (
            <div data-app='live-page'>
                <h4 className='website-title'>{translate('label.recapEvent')}</h4>
                <div>
                    {this.fieldFor('name')}
                    {this.fieldFor('description')}
                    {this.fieldFor('status')}
                    {this.fieldFor('reservedToAffiliates', { value: this.state.reservedToAffiliates == null ? null : '' + this.state.reservedToAffiliates, onChange: (value) => this.setState({ reservedToAffiliates: (value === 'true' ? true : value === 'false' ? false : null) }) })}
                    {this.fieldFor('reservedToPartners', { value: this.state.reservedToPartners == null ? null : '' + this.state.reservedToPartners, onChange: (value) => this.setState({ reservedToPartners: (value === 'true' ? true : value === 'false' ? false : null) }) })}
                    {this.fieldFor('current', { value: this.state.current == null ? null : '' + this.state.current, onChange: (value) => this.setState({ current: (value === 'true' ? true : value === 'false' ? false : null) }) })}

                    {/* {this.fieldFor('date')} */}
                </div>
            </div>
        );
    }
});
// {"id":3,"name":"TestName","description":"TestDesc","reservedToAffiliates":false,"reservedToPartners":false,"status":"OPEN","current":false}
