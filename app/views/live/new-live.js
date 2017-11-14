import React from 'react';
import { translate } from 'focus-core/translation';
import Button from 'focus-components/components/button';
import { component as Popin } from 'focus-components/application/popin';
import connectToStore from 'focus-components/behaviours/store/connect';

// import AddPopin from '../events/add-popin';
// import List from '../../components/list';
// import RecapEvent from './recap-event';

import RoundListView from '@/views/events/detail/round-list-view';
import eventActions from '@/action/event';
import EventStore from '@/stores/event';


export default connectToStore([{
    store: EventStore,
    properties: ['eventDetail']
}], () => ({ eventDetail: EventStore.getEventDetail() }))(
    React.createClass({
        displayName: 'LiveView',
        getInitialState() {
            return {
                displayPopin: false
            };
        },
        componentWillMount() {
            eventActions.getCurrentEvent();
        },
        componentWillReceiveProps(nextProps) {
            if (nextProps.eventDetail && nextProps.eventDetail.id && (!this.props.eventDetail || !this.props.eventDetail.id || nextProps.eventDetail.id !== this.props.eventDetail.id)) {
                eventActions.listUsers(nextProps.eventDetail.id);
            }
        },

        render() {
            return (
                <div data-app='live-page'>
                    <h3 className='website-title'>{translate('website.live')}</h3>
                    {this.props.eventDetail && this.props.eventDetail.id && <RoundListView hasForm={false} id={this.props.eventDetail.id} hasLoad={false} />}
                </div>
            );
        }
    }));
