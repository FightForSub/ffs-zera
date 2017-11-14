import React from 'react';
import { component as List } from 'focus-components/list/selection/list';
import { translate } from 'focus-core/translation';
import Button from 'focus-components/components/button';
import { component as Popin } from 'focus-components/application/popin';
import connectToStore from 'focus-components/behaviours/store/connect';
import { dispatchData } from 'focus-core/dispatcher';
import UserStore from 'focus-core/user/built-in-store';

import EventStore from '@/stores/event';
import actions from '@/action/event';
import { navigate } from '@/utilities/router';
import { isAdmin } from '@/utilities/check-rights';

import LineComponent from './line';
import AddPopin from './add-popin';

// {"id":3,"name":"TestName","description":"TestDesc","reservedToAffiliates":false,"reservedToPartners":false,"status":"OPEN","current":false}
@connectToStore([{
    store: EventStore,
    properties: ['eventList']
},
{
    store: UserStore,
    properties: ['profile']
}], () => ({ eventList: EventStore.getEventList() }))
class EventsView extends React.Component {

    constructor(props) {
        super(props);
        this.state = { displayPopin: false };
    }
    componentWillMount() {
        actions.list();
    }

    /** @inheritDoc */
    render() {
        return (
            <div data-app='events-page'>
                <h3 className='website-title'>{translate('label.events')}</h3>
                {isAdmin() && <Button label='label.createEvent' onClick={() => { dispatchData('eventDetail', null); this.setState({ displayPopin: true }) }} />}
                <List data={this.props.eventList || []} LineComponent={LineComponent} isSelection={false} onLineClick={data => { dispatchData('eventRoundList', null); dispatchData('eventRoundDetail', null); navigate(`event/${data.id}`) }} />
                {this.state.displayPopin && isAdmin() && <Popin open type='from-right' onPopinClose={() => this.setState({ displayPopin: false })} >
                    <AddPopin hasLoad={false} isEdit forCreation />
                </Popin>}
            </div>
        );
    }
}


export default EventsView;