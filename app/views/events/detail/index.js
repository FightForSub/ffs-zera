import React from 'react';
import { translate } from 'focus-core/translation';
import Button from 'focus-components/components/button';
import { component as Popin } from 'focus-components/application/popin';
import connectToStore from 'focus-components/behaviours/store/connect';
import UserStore from 'focus-core/user/built-in-store';
import { dispatchData } from 'focus-core/dispatcher';
import confirm from 'focus-core/application/confirm';


import AddPopin from '@/views/events/add-popin';
import UserLine from '@/components/user-line';
import List from '@/components/list';
import { navigate } from '@/utilities/router';
import { isAdmin } from '@/utilities/check-rights';
import EventStore from '@/stores/event';
import eventActions from '@/action/event';

import UserPopin from './detail-user';
import RecapEvent from './recap-event';
import RoundListView from './round-list-view';


@connectToStore([{
    store: EventStore,
    properties: ['eventUserList']
},
{
    store: UserStore,
    properties: ['profile']
}], () => ({ userList: EventStore.getEventUserList() || [] }))
class DetailEventView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            displayPopin: false
        };
        this.deleteEvent = this.deleteEvent.bind(this);
        this.showAddParticipant = this.showAddParticipant.bind(this);
        this.showEditParticipant = this.showEditParticipant.bind(this);
        this.hidePopins = this.hidePopins.bind(this);
    }

    componentWillMount() {
        eventActions.listUsers(this.props.params.id);
    }
    updateState(id, isDead) {
        const { dataList } = this.state;
        this.setState({ dataList: dataList.map(elt => elt.id !== id ? elt : { ...elt, isDead }) })
    }

    buildAction({ isDead, id }) {
        return {
            iconText: isDead ? 'restore' : 'delete',
            action: () => this.updateState(id, !isDead)
        }
    }

    deleteEvent() {
        confirm(translate('label.confirmEventDeletion'))
            .then(() => this.doDeleteEvent())
            .catch(() => { });
    }

    doDeleteEvent() {
        eventActions.delete(this.props.params.id).then(() => {
            navigate('events');
        });
    }

    showEditParticipant() {
        dispatchData('eventUserDetail', null);
        this.setState({ createUser: true });
    }


    showAddParticipant() {
        dispatchData('eventUserDetail', null);
        this.setState({ createUser: true });
    }

    showEditParticipant(id) {
        if (isAdmin()) {
            this.setState({ twitchId: id });
        }
    }


    hidePopins() {
        this.setState({
            createUser: false,
            twitchId: null,
            displayPopin: false
        });
    }

    render() {
        const toDisplayAlive = this.props.userList
            .map(elt => ({
                logoUrl: elt.logo,
                LineContent: <UserLine {...elt} />,
                onClick: () => this.showEditParticipant(elt.twitchId)
            }));

        return (
            <div data-app='detail-event-page'>
                <h3 className='website-title'>{translate('website.detailEvent')}</h3>
                <div className='pad-bottom'>
                    <div className='pad-buttons'>
                        {this.props.params.id && isAdmin() &&
                            <Button
                                label={'label.editEvent'}
                                onClick={() => { this.setState({ displayPopin: true }) }}
                            />
                        }
                        <Button label='label.goToResults' onClick={() => { navigate(`event/${this.props.params.id}/results`) }} />
                    </div>
                    {isAdmin() && <Button label='label.deleteEvent' onClick={this.deleteEvent} />}
                </div>
                {this.props.params.id && <RecapEvent isEdit={false} id={this.props.params.id} />}
                <hr />
                <h4 className='website-title'>{translate('label.users')}</h4>
                {isAdmin() && <div>
                    <Button label={'label.addUser'} onClick={this.showAddParticipant} />
                </div>}
                <List data-dd='empilable' dataList={toDisplayAlive} isWrapping />
                <hr />
                <RoundListView hasForm={false} noLive id={this.props.params.id} hasLoad={false} />
                {this.state.displayPopin && isAdmin() && <Popin open type='from-right' onPopinClose={this.hidePopins} >
                    <AddPopin hasLoad={false} isEdit id={this.props.params.id} onSave={this.hidePopins} />
                </Popin>}
                {this.state.twitchId && isAdmin() && <Popin open type='from-right' onPopinClose={this.hidePopins} >
                    <UserPopin hasLoad={false} isEdit id={this.props.params.id} idUser={this.state.twitchId} onSave={this.hidePopins} />
                </Popin>}
                {this.state.createUser && isAdmin() && <Popin open type='from-right' onPopinClose={this.hidePopins} >
                    <UserPopin hasLoad={false} isEdit forCreation id={this.props.params.id} onSave={this.hidePopins} />
                </Popin>}
            </div>
        );
    }
}
export default DetailEventView;