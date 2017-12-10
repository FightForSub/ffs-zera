import React from 'react';
import { component as List } from 'focus-components/list/selection/list';
import { translate } from 'focus-core/translation';
import Button from 'focus-components/components/button';
import connectToStore from 'focus-components/behaviours/store/connect';
import { dispatchData } from 'focus-core/dispatcher';
import UserStore from 'focus-core/user/built-in-store';
import Dropdown from 'focus-components/components/dropdown';

import { component as Popin } from '@/components/popin';
import EventStore from '@/stores/event';
import actions from '@/action/event';
import { navigate } from '@/utilities/router';
import { isAdmin } from '@/utilities/check-rights';

import LineComponent from './line';
import AddPopin from './add-popin';
import NoEvents from './no-events';

@connectToStore([{
    store: EventStore,
    properties: ['eventList']
},
{
    store: UserStore,
    properties: ['profile']
}], () => ({ eventList: EventStore.getEventList(), profile: UserStore.getProfile() || {} }))
class EventsView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayPopin: false,
            tri: 'id',
            triLabel: 'event.id',
            filtre: null,
            filtreLabel: 'select.all'
        };
    }
    componentWillMount() {
        if (this.props.userOnly) {
            if (this.props.profile.apiToken) {
                this.hasLoadMine = true;
                actions.loadMyEvents();
            }
        } else {
            actions.list();
        }
    }

    componentWillReceiveProps({ profile }) {
        if (this.props.userOnly && !this.hasLoadMine && profile.apiToken && !this.props.profile.apiToken) {
            this.hasLoadMine = true;
            actions.loadMyEvents();
        }
    }

    buildDropdown(filtre, label) {
        return {
            label,
            action: () => { this.setState({ filtre: filtre, filtreLabel: label }); }
        };
    }

    buildDropdownValues() {
        return [
            { filtre: null, label: translate('select.all') },
            { filtre: 'OPEN', label: translate('select.open') },
            { filtre: 'CLOSED', label: translate('select.closed') },
            { filtre: 'STARTED', label: translate('select.started') },
            { filtre: 'ENDED', label: translate('select.ended') }
        ].map(({ label, filtre }) => this.buildDropdown(filtre, label));
    }

    buildSortDropdown(sort, sortLabel) {
        return {
            label: sortLabel,
            action: () => { this.setState({ tri: sort, triLabel: sortLabel }); }
        };
    }

    buildSortDropdownValues(forValidated) {
        return [
            {
                label: 'event.id',
                sort: 'id'
            },
            {
                label: 'event.name',
                sort: 'name'
            },
            {
                label: 'event.status',
                sort: 'status'
            },
            {
                label: 'event.current',
                sort: 'current'
            }
        ].map(({ label, sort }) => this.buildSortDropdown(sort, label, forValidated));
    }

    /** @inheritDoc */
    render() {
        const { filtre, tri } = this.state;
        const filteredList = (this.props.eventList || [])
            .filter(({ status }) => !filtre || status === filtre)
            .sort((a, b) => {
                if (tri === 'name' || tri === 'status') {
                    return a[tri].localeCompare(b[tri]);
                }
                return a[tri] - b[tri];
            });
        return (
            <div data-app='events-page'>
                <h3 className='website-title'>
                    {this.props.userOnly ? translate('label.myEventsPage') : translate('label.events')}
                </h3>

                <div className='pad-bottom'>
                    {!this.props.userOnly && isAdmin() && <Button label='label.createEvent' onClick={() => { dispatchData('eventDetail', null); this.setState({ displayPopin: true }) }} />}
                    <div className='filter-container'>
                        <div className='filter-container'>
                            <Dropdown position='left' iconProps={{ name: 'filter_list' }} operationList={this.buildDropdownValues()} />
                            <div>{`Filtre: ${translate(this.state.filtreLabel)}`}</div>
                        </div>
                        <div className='filter-container'>
                            <Dropdown position='left' iconProps={{ name: 'sort' }} operationList={this.buildSortDropdownValues()} />
                            <div>{`Tri: ${translate(this.state.triLabel)}`}</div>
                        </div>
                    </div>
                </div>
                <List
                    data={filteredList}
                    LineComponent={LineComponent}
                    isSelection={false}
                    onLineClick={data => {
                        dispatchData('eventRoundList', null);
                        dispatchData('eventRoundDetail', null);
                        navigate(`event/${data.id}`);
                    }}
                />

                {this.props.eventList && this.props.eventList.length === 0 && <NoEvents />}

                {!this.props.userOnly && this.state.displayPopin && isAdmin() && <Popin open type='from-right' onPopinClose={() => this.setState({ displayPopin: false })} >
                    <AddPopin hasLoad={false} hasForm={false} isEdit forCreation />
                </Popin>}
            </div>
        );
    }
}


export default EventsView;