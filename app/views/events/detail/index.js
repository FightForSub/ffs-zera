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
import eventServices from '@/services/event';

import UserPopin from './detail-user';
import RecapEvent from './recap-event';
import RoundListView from './round-list-view';
import Dropdown from 'focus-components/components/dropdown';

@connectToStore([{
    store: EventStore,
    properties: ['eventUserList']
},
{
    store: UserStore,
    properties: ['profile']
}], () => ({ userList: EventStore.getEventUserList() || [], userId: (UserStore.getProfile() || {}).twitchId }))
class DetailEventView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            displayPopin: false,
            filtreLabel: 'select.all',
            filtre: null
        };
        this.deleteEvent = this.deleteEvent.bind(this);
        this.showAddParticipant = this.showAddParticipant.bind(this);
        this.showEditParticipant = this.showEditParticipant.bind(this);
        this.hidePopins = this.hidePopins.bind(this);
        this.isRegistered = this.isRegistered.bind(this);
        this.doUnregister = this.doUnregister.bind(this);
        this.buildDropdownValues = this.buildDropdownValues.bind(this);
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

    showAddParticipant() {
        dispatchData('eventUserDetail', null);
        this.setState({ createUser: true });
    }

    showEditParticipant(id) {
        if (isAdmin()) {
            this.setState({ twitchId: id });
        }
    }

    unregister() {
        return eventActions.unregisterFromEvent(this.props.params.id, this);
    }

    doUnregister() {
        confirm(translate('label.confirmEventUnregister'))
            .then(() => this.unregister())
            .then(() => eventActions.listUsers(this.props.params.id))
            .catch(() => { });
    }

    isRegistered() {
        return (this.props.userList || []).some(({ twitchId }) => (twitchId == this.props.userId));
    }

    hidePopins() {
        this.setState({
            createUser: false,
            twitchId: null,
            displayPopin: false
        });
    }

    loadUserFiltered(status) {
        eventServices.listUsers({ id: this.props.params.id, status }).then(data => {
            this.setState({
                filteredUser: data
            });
        }).catch(() => { });
    }

    buildDropdown(filtre, label) {
        return {
            label,
            action: () => { if (filtre) { this.loadUserFiltered(filtre); } this.setState({ filtre: filtre, filtreLabel: label }); }
        };
    }

    buildDropdownValues() {
        return [
            {
                label: 'select.all',
                filtre: null
            },
            {
                label: 'select.validated',
                filtre: 'VALIDATED'
            },
            {
                label: 'select.awaitingEmailValidation',
                filtre: 'AWAITING_FOR_EMAIL_VALIDATION'
            }, {
                label: 'select.awaitingAdminValidation',
                filtre: 'AWAITING_FOR_ADMIN_VALIDATION'
            }, {
                label: 'select.refused',
                filtre: 'REFUSED'
            }
        ].map(({ label, filtre }) => this.buildDropdown(filtre, label));
    }

    render() {
        const toDisplayUser = (this.state.filtre ? this.state.filteredUser || [] : this.props.userList)
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
                <div className='pad-bottom'>
                    {isAdmin() && <div>
                        <Button label={'label.addUser'} onClick={this.showAddParticipant} />
                    </div>}
                    {this.isRegistered() && <div>
                        <Button label={'label.unregister'} onClick={this.doUnregister} />
                    </div>}
                    <div className='filter-container'>
                        <Dropdown position='left' iconProps={{ name: 'filter_list' }} operationList={this.buildDropdownValues()} />
                        <div>{`Filtre: ${translate(this.state.filtreLabel)}`}</div>
                    </div>
                </div>

                <List data-dd='empilable' dataList={toDisplayUser} isWrapping />
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