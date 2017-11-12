import React, { Component } from 'react';
import { component as List } from 'focus-components/list/selection/list';
import { translate } from 'focus-core/translation';
import Button from 'focus-components/components/button';
import { component as Popin } from 'focus-components/application/popin';
import connectToStore from 'focus-components/behaviours/store/connect';
import EventStore from '../../stores/event';
import { dispatchData } from 'focus-core/dispatcher';

import actions from '../../action/event';

import LineComponent from './line';
import AddPopin from './add-popin';
import { navigate } from '../../utilities/router';


// {"id":3,"name":"TestName","description":"TestDesc","reservedToAffiliates":false,"reservedToPartners":false,"status":"OPEN","current":false}
@connectToStore([{
    store: EventStore,
    properties: ['eventList']
}], () => ({ eventList: EventStore.getEventList() }))
class EventsView extends Component {

    constructor(props) {
        super(props);
        this.state = { displayPopin: false, modeViewer: true };
    }
    componentWillMount() {
        actions.list();
    }

    /** @inheritDoc */
    render() {
        return (
            <div data-app='events-page'>
                <h3 className='website-title'>{translate('label.events')}</h3>
                <Button label={'Swap Mode to :' + (!this.state.modeViewer ? 'Viewer' : 'Modo')} onClick={() => { this.setState({ modeViewer: !this.state.modeViewer }) }} />
                {!this.state.modeViewer && <Button label='label.createEvent' onClick={() => { dispatchData('eventDetail', null); this.setState({ displayPopin: true }) }} />}
                <List data={this.props.eventList || []} LineComponent={LineComponent} isSelection={false} onLineClick={data => navigate(`event/${data.id}`)} />
                {this.state.displayPopin && <Popin open type='from-right' onPopinClose={() => this.setState({ displayPopin: false })} >
                    <AddPopin hasLoad={false} isEdit forCreation />
                </Popin>}
            </div>
        );
    }
}


export default EventsView;