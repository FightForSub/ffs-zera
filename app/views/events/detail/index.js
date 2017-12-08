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
import { addSuccessMessage } from 'focus-core/message';

@connectToStore([{
    store: EventStore,
    properties: ['eventUserList', 'eventDetail', 'eventUserRegistration']
},
{
    store: UserStore,
    properties: ['profile']
}], () => ({
    userList: EventStore.getEventUserList() || [],
    userId: (UserStore.getProfile() || {}).twitchId,
    profile: UserStore.getProfile() || {},
    event: EventStore.getEventDetail() || {}
}))
class DetailEventView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            displayPopin: false,
            filtreLabel: 'select.all',
            filtre: null,
            triLabel: 'user.views',
            tri: 'views',
            triLabelValidated: 'user.username',
            triValidate: 'username'

        };
        this.deleteEvent = this.deleteEvent.bind(this);
        this.showAddParticipant = this.showAddParticipant.bind(this);
        this.showEditParticipant = this.showEditParticipant.bind(this);
        this.hidePopins = this.hidePopins.bind(this);
        this.isRegistered = this.isRegistered.bind(this);
        this.doUnregister = this.doUnregister.bind(this);
        this.register = this.register.bind(this);
        this.buildDropdownValues = this.buildDropdownValues.bind(this);
    }

    componentWillMount() {
        this.loadData();
    }

    loadData() {
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

    register() {
        return eventActions.registerToEvent(this.props.params.id, this).then(data => {
            if (EventStore.getStatusEventUserRegistration().name === 'saved') {
                addSuccessMessage('label.registerSuccess');
                eventActions.listUsers(this.props.params.id);
                return data;
            }
        });
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

    hidePopins(shouldReload) {
        this.setState({
            createUser: false,
            twitchId: null,
            displayPopin: false
        });
        if (shouldReload) {
            this.loadData();
        }

    }

    buildDropdown(filtre, label) {
        return {
            label,
            action: () => { this.setState({ filtre: filtre, filtreLabel: label }); }
        };
    }

    buildSortDropdown(sort, sortLabel, forValidated) {
        if (!forValidated) {
            return {
                label: sortLabel,
                action: () => { this.setState({ tri: sort, triLabel: sortLabel }); }
            };
        }
        return {
            label: sortLabel,
            action: () => { this.setState({ triValidated: sort, triLabelValidated: sortLabel }); }
        };
    }

    buildDropdownValues() {
        return [
            {
                label: 'select.all',
                filtre: null
            },
            // {
            //     label: 'select.validated',
            //     filtre: 'VALIDATED'
            // },
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


    buildSortDropdownValues(forValidated) {
        return [
            {
                label: 'user.username',
                sort: 'username'
            },
            {
                label: 'user.followers',
                sort: 'followers'
            },
            {
                label: 'user.views',
                sort: 'views'
            }
        ].map(({ label, sort }) => this.buildSortDropdown(sort, label, forValidated));
    }

    compare(a, b, tri) {
        if (tri === 'username') {
            return a[tri].localeCompare(b[tri]);
        }
        return b[tri] - a[tri];
    }

    isEligible() {
        const { minimumViews, minimumFollowers, reservedToAffiliates, reservedToPartners } = this.props.event;
        const { views: myViews, followers: myFollowers, broadcasterType } = this.props.profile;
        let isEligible = !reservedToAffiliates && !reservedToPartners;
        isEligible |= reservedToAffiliates && broadcasterType === 'affiliate';
        isEligible |= reservedToPartners && broadcasterType === 'partner';
        isEligible &= (minimumFollowers <= myFollowers && minimumViews <= myViews);
        return !!isEligible;
    }

    render() {
        const { tri, triValidate } = this.state;
        const toDisplayValidatedUser = (this.props.userList || [])
            .filter(({ status }) => status === 'VALIDATED')
            .sort((a, b) => this.compare(a, b, triValidate))
            .map(elt => ({
                logoUrl: elt.logo,
                LineContent: <UserLine {...elt} />,
                onClick: () => this.showEditParticipant(elt.twitchId)
            }));

        const toDisplayUser = (this.props.userList || [])
            .filter(({ status }) => status !== 'VALIDATED' && (!this.state.filtre || status === this.state.filtre))
            .sort((a, b) => this.compare(a, b, tri))
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
                <h4 className='website-title'>{translate('label.users')}{this.props.event.status === 'OPEN' ? <em>{' - ' + translate('label.waitingValidation')}</em> : ''}</h4>
                {this.isRegistered() && <h5>{translate('label.userRegistered')}</h5>}
                {!!this.props.profile.apiToken && !this.isRegistered() && !this.isEligible() && <h5>{translate('label.notEligible')}</h5>}
                <div className='pad-bottom'>
                    {isAdmin() && <div>
                        <Button label={'label.addUser'} onClick={this.showAddParticipant} />
                    </div>}
                    {this.isRegistered() && <div>
                        <Button label={'label.unregister'} onClick={this.doUnregister} />
                    </div>}
                    {!this.isRegistered() && this.isEligible() && <div>
                        <Button label={'label.register'} onClick={this.register} />
                    </div>}
                </div>
                <h4 className='website-title'>{translate('label.users') + ' - '}<em>{translate('label.validated')}</em></h4>
                <div className='filter-container'>
                    <Dropdown position='left' iconProps={{ name: 'sort' }} operationList={this.buildSortDropdownValues()} />
                    <div>{`Tri: ${translate(this.state.triLabelValidated)}`}</div>
                </div>
                <List data-dd='empilable' dataList={toDisplayValidatedUser} isWrapping />

                <h4 className='website-title'>{translate('label.users') + ' - '}<em>{translate('label.waitingValidation')}</em></h4>

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

                <List data-dd='empilable' dataList={toDisplayUser} isWrapping />
                <hr />
                <RoundListView hasForm={false} noLive id={this.props.params.id} hasLoad={false} />
                {this.state.displayPopin && isAdmin() && <Popin open type='from-right' onPopinClose={this.hidePopins} >
                    <AddPopin hasLoad={false} isEdit id={this.props.params.id} onSave={() => this.hidePopins(true)} />
                </Popin>}
                {this.state.twitchId && isAdmin() && <Popin open type='from-right' onPopinClose={this.hidePopins} >
                    <UserPopin hasLoad={false} isEdit id={this.props.params.id} idUser={this.state.twitchId} onSave={() => this.hidePopins(true)} />
                </Popin>}
                {this.state.createUser && isAdmin() && <Popin open type='from-right' onPopinClose={this.hidePopins} >
                    <UserPopin hasLoad={false} isEdit forCreation id={this.props.params.id} onSave={() => this.hidePopins(true)} />
                </Popin>}
            </div>
        );
    }
}
export default DetailEventView;