import React, { Component } from 'react';
import { translate } from 'focus-core/translation';
import Button from 'focus-components/components/button';
import { component as Popin } from 'focus-components/application/popin';
import connectToStore from 'focus-components/behaviours/store/connect';
import UserStore from 'focus-core/user/built-in-store';

import AddPopin from '../../events/add-popin';
import UserPopin from './detail-user';

import List from '../../../components/list';
import RecapEvent from './recap-event';

import EventStore from '../../../stores/event';
import eventActions from '../../../action/event';
import { dispatchData } from 'focus-core/dispatcher';

import RoundListView from './round-list-view';
import { navigate } from '../../../utilities/router';
import { isAdmin } from '../../../utilities/check-rights';


@connectToStore([{
    store: EventStore,
    properties: ['eventUserList']
},
{
    store: UserStore,
    properties: ['profile']
}], () => ({ userList: EventStore.getEventUserList() || [] }))
class DetailEventView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            displayPopin: false
        };
    }

    componentWillMount() {
        eventActions.listUsers(this.props.params.id);
    }
    updateState(id, isDead) {
        const { dataList } = this.state;
        this.setState({ dataList: dataList.map(elt => elt.id !== id ? elt : { ...elt, isDead }) })
    }

    renderLine({ username, views, twitchId, followers }) {
        // <div>{'TwitchId: ' + twitchId}</div>

        return (
            <span className='detail-user-line-content'>
                <span>{username}</span>
                <span>{'Followers: ' + followers}</span>
                <span>{'Views: ' + views}</span>
            </span>
        );
    }
    buildAction({ isDead, id }) {
        return {
            iconText: isDead ? 'restore' : 'delete',
            action: () => this.updateState(id, !isDead)
        }
    }
    render() {
        const toDisplayAlive = this.props.userList
            .map(elt => ({
                logoUrl: elt.logo,
                LineContent: this.renderLine(elt),
                onClick: () => {
                    if (isAdmin()) {
                        this.setState({
                            twitchId: elt.twitchId
                        })
                    }
                }
            }));

        return (
            <div data-app='detail-event-page'>
                <h3 className='website-title'>{translate('website.detailEvent')}</h3>
                <div className='pad-buttons'>
                    {this.props.params.id && isAdmin() && <Button label={'label.editEvent'} onClick={() => { this.setState({ displayPopin: true }) }} />}
                    <Button label='label.goToResults' onClick={() => { navigate(`event/${this.props.params.id}/results`) }} />
                </div>
                {this.props.params.id && <RecapEvent isEdit={false} id={this.props.params.id} />}
                <hr />
                <h4 className='website-title'>{translate('label.users')}</h4>
                {isAdmin() && <div>
                    <Button label={'label.addUser'} onClick={() => { dispatchData('eventUserDetail', null); this.setState({ createUser: true }) }} />
                </div>}
                <List data-dd='empilable' dataList={toDisplayAlive} isWrapping />
                <hr />
                <RoundListView noLive hasForm={false} id={this.props.params.id} hasLoad={false} />
                {this.state.displayPopin && isAdmin() && <Popin open type='from-right' onPopinClose={() => this.setState({ displayPopin: false })} >
                    <AddPopin hasLoad={false} isEdit id={this.props.params.id} onSave={() => this.setState({ displayPopin: false })} />
                </Popin>}
                {this.state.twitchId && isAdmin() && <Popin open type='from-right' onPopinClose={() => this.setState({ twitchId: null })} >
                    <UserPopin hasLoad={false} isEdit id={this.props.params.id} idUser={this.state.twitchId} onSave={() => this.setState({ twitchId: null })} />
                </Popin>}
                {this.state.createUser && isAdmin() && <Popin open type='from-right' onPopinClose={() => this.setState({ createUser: false })} >
                    <UserPopin hasLoad={false} isEdit forCreation id={this.props.params.id} onSave={() => this.setState({ createUser: false })} />
                </Popin>}
            </div>
        );
    }
}
export default DetailEventView;