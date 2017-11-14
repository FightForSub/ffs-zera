import React from 'react';
// import { component as List } from 'focus-components/list/selection/list';
import List from '../../../components/list';
import { mixin as formPreset } from 'focus-components/common/form';

import { translate } from 'focus-core/translation';
import Button from 'focus-components/components/button';
import { component as Popin } from 'focus-components/application/popin';
import connectToStore from 'focus-components/behaviours/store/connect';

import UserStore from 'focus-core/user/built-in-store';
import { dispatchData } from 'focus-core/dispatcher';
import confirm from 'focus-core/application/confirm';

import { navigate } from '../../../utilities/router';
import { isAdmin, isModo } from '../../../utilities/check-rights';
import EventStore from '../../../stores/event';


import actions from '../../../action/event';

export default connectToStore([{
    store: EventStore,
    properties: ['eventRoundList', 'eventRoundDetail', 'eventUserList']
},
{
    store: UserStore,
    properties: ['profile']
}], () => ({ eventRoundList: EventStore.getEventRoundList(), eventRoundDetail: EventStore.getEventRoundDetail(), userList: EventStore.getEventUserList() || [] }))
(React.createClass({
    displayName: 'RoundListView',
    mixins: [formPreset],
    definitionPath: 'user',
    getInitialState() {
        return { displayPopin: false }
    },

    actions: {},
    componentWillMount() {
        actions.getRounds(this.props.id);
        this.action.save = this.save;
        if (this.props.eventRoundList && this.props.eventRoundList.length > 0) {
            this.onChangeRound(this.props.eventRoundList[0]);
        }

        this.handle = window.setInterval(() => {
            if (this.state.roundId && this.props.id) {
                actions.getRoundScore({ id: this.props.id, idRound: this.state.roundId });
            }
        }, 3 * 1000)
    },
    componentWillUnmount() {
        window.clearInterval(this.handle);
    },
    save() {
        // id, idRound, idUser, score
        const { fixTwitchId, twitchId, roundId, score } = this.state;
        actions.updateUserScore({ id: this.props.id, idRound: roundId, idUser: fixTwitchId || twitchId, score }, this).then(data => {
            if (data && data.status && data.status.eventRoundUpdate && data.status.eventRoundUpdate.name === 'saved') {
                actions.getRoundScore({ id: this.props.id, idRound: roundId });
                this.setState({ displayPopin: false, twitchId: null, fixTwitchId: null, score: null })
            }
        });
    },
    onChangeRound(value) {
        this.setState({ roundId: value });
        actions.getRoundScore({ id: this.props.id, idRound: value });
    },
    componentWillReceiveProps({ eventRoundList }) {
        if (eventRoundList && eventRoundList.length > 0 && (!this.props.eventRoundList || !this.props.eventRoundList.length > 0)) {
            this.onChangeRound(eventRoundList[0]);
        } else if (eventRoundList && eventRoundList.length === 0) {
            this.setState({ roundId: null });
            dispatchData('eventRoundDetail', null);
        }
    },
    renderRound(children) {
        const tabs = (this.props.eventRoundList || []).map((round, idx) => (<a onClick={(evt) => { evt.preventDefault(); this.onChangeRound(round); }} className={`mdl-tabs__tab ${this.state.roundId === round ? 'is-active' : ''}`}>{'Round ' + (idx + 1)}</a>));

        return (<div className='mdl-tabs mdl-js-tabs mdl-js-ripple-effect is-upgraded'>
            <div className='mdl-tabs__tab-bar'>
                {tabs}
            </div>
            <div className='mdl-tabs__panel is-active'>{this.state.roundId && children}</div>
        </div>);
    },
    renderAlive() {
        const data = (this.props.userList || []).filter(elt => {
            return !(this.props.eventRoundDetail || []).some(item => item.id === elt.twitchId && item.score)
        }).map(elt => ({
            logoUrl: elt.logo,
            LineContent: <span className='detail-user-line-content'>{elt.username}</span>,
            onClick: () => this.handleLineClick(elt)
        }));
        return <List data- dd='empilable' isWrapping dataList={data} />
    },
    handleLineClick(elt) {
        if (isModo()) {
            this.setState({
                displayPopin: true,
                fixTwitchId: elt.id || elt.twitchId
            })
        } else {
            const newTab = document.createElement('a');
            newTab.href = elt.url;
            newTab.target = '_blank';
            newTab.style.display = 'none';
            document.body.appendChild(newTab);
            newTab.click();
            document.body.removeChild(newTab);
        }
    },
    renderLine({ username, twitchId, score }) {
        return (
            <span className='detail-user-line-content' >
                <span>{username}</span>
                <span>{'Score: ' + score}</span>
            </span>
        );
    },
    addRound() {
        actions.createRound({ id: this.props.id }).then(() => {
            actions.getRounds(this.props.id);
        });
    },
    deleteRound() {
        confirm(translate('label.confirmRoundDeletion'))
            .then(() => this.doDeleteRound())
            .catch(() => { });
    },
    doDeleteRound() {
        actions.deleteRound({ id: this.props.id, idRound: this.state.roundId }).then(() => {
            actions.getRounds(this.props.id);
        });
    },
    componentDidUpdate(prevProps, prevState) {
        if (!prevState.displayPopin && this.state.displayPopin && isModo()) {
            this.refs['user.score'].refs.input.refs.htmlInput.focus()
        }
    },
    saveOnEnter(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.clearError();
            if (this._validate()) {
                this.action.save.call(this, this._getEntity());
            }
        }
    },
    /** @inheritDoc */
    renderContent() {
        const toDisplay = (this.props.eventRoundDetail || [])
            .filter(elt => elt.score)
            .sort((a, b) => (a.score - b.score))
            .map(elt => ({
                logoUrl: elt.logo,
                LineContent: this.renderLine(elt),
                onClick: () => this.handleLineClick(elt)
            }));
        return (
            <div data-app='round-list-page' >
                {this.props.noLive && <h4 className='website-title'>{translate('label.rounds')}</h4>}
                < div className='pad-bottom' >
                    <div className='pad-buttons' >
                        <Button label='label.goToResults' onClick={() => { navigate(`event/${this.props.id}/results`) }} />
                        {this.props.id && this.state.roundId && <Button label='label.refreshResult' onClick={() => { actions.getRoundScore({ id: this.props.id, idRound: this.state.roundId }); }} />}
                    </div>
                    {isAdmin() && <div><Button label='label.addRound' onClick={this.addRound} /></div>}
                    {this.state.roundId && this.renderRound()}
                    <div className='pad-buttons' style={{ display: 'flex' }} >
                        {isModo() && this.state.roundId && this.state.roundId !== 'ALL' &&
                                <Button label='label.updateParticipant' onClick={() => { this.setState({ displayPopin: true }) }} />
                        }
                        {isAdmin() && this.state.roundId && <Button label='label.deleteRound' onClick={this.deleteRound} />}

                    </div >
                </div >
                {this.state.roundId && <div>{!this.props.noLive && <h5 className='website-title'>{translate('label.alive')}</h5>}
                    {!this.props.noLive && this.renderAlive()}
                    {!this.props.noLive && <h5 className='website-title'>{translate('label.dead')}</h5>}

                    <List data-dd='empilable' dataList={toDisplay} />
                    {this.state.displayPopin && isModo() && <Popin open type='from-right' onPopinClose={() => this.setState({ displayPopin: false, twitchId: null, fixTwitchId: null, score: null })}>
                        <div onKeyUp={this.saveOnEnter}>
                            <h4 className='website-title'>{translate('label.updateScore')}</h4>
                            {this.fieldFor('twitchId', { isEdit: !this.state.fixTwitchId, value: this.state.fixTwitchId || this.state.twitchId, values: (this.props.userList || []).map(({ twitchId, username }) => ({ code: twitchId, label: username })) })}
                            {this.fieldFor('score', { isEdit: true })}
                            {this.buttonSave()}
                        </div>
                    </Popin>}</div>
                }

            </div >
        );
    }
}));

