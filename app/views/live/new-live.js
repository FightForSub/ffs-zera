import React from 'react';
import { translate } from 'focus-core/translation';
import connectToStore from 'focus-components/behaviours/store/connect';

import RoundListView from '@/views/events/detail/round-list-view';
import eventActions from '@/action/event';
import EventStore from '@/stores/event';

export default connectToStore([{
    store: EventStore,
    properties: ['eventDetail']
}], () => ({ eventDetail: EventStore.getEventDetail() }))(class extends React.Component {
    static displayName = 'LiveView';

    state = {
        displayPopin: false
    };

    componentWillMount() {
        eventActions.getCurrentEvent();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.eventDetail && nextProps.eventDetail.id && (!this.props.eventDetail || !this.props.eventDetail.id || nextProps.eventDetail.id !== this.props.eventDetail.id)) {
            eventActions.listUsers({ id: nextProps.eventDetail.id, status: 'VALIDATED' });
        }
    }

    render() {
        return (
            <div data-app='live-page'>
                <h3 className='website-title'>{translate('website.live')}</h3>
                {this.props.eventDetail && this.props.eventDetail.id && <RoundListView hasForm={false} id={this.props.eventDetail.id} hasLoad={false} />}
            </div>
        );
    }
});
