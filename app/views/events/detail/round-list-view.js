import React from 'react';

import createReactClass from 'create-react-class';

import UserStore from 'focus-core/user/built-in-store';
import { dispatchData } from 'focus-core/dispatcher';
import confirm from 'focus-core/application/confirm';
import { translate } from 'focus-core/translation';

import { mixin as formPreset } from 'focus-components/common/form';
import Button from 'focus-components/components/button';
import connectToStore from 'focus-components/behaviours/store/connect';

import { component as Popin } from '@/components/popin';
import List from '@/components/list';
import Tabs from '@/components/tab';
import UserLine from '@/components/user-line';
import { navigate } from '@/utilities/router';
import { isAdmin, isModo } from '@/utilities/check-rights';
import EventStore from '@/stores/event';
import actions from '@/action/event';
import FFSWebSocket from '@/utilities/web-socket';
import TwitchLive from './twitch-live';
import downloadData from '@/utilities/download-data';

export default connectToStore([{
    store: EventStore,
    properties: ['eventRoundList', 'eventRoundDetail', 'eventUserList']
},
{
    store: UserStore,
    properties: ['profile']
}], () => ({
    eventRoundList: EventStore.getEventRoundList(),
    eventRoundDetail: EventStore.getEventRoundDetail(),
    userList: EventStore.getEventUserList() || [],
    event: EventStore.getEventDetail() || {}
}))
(createReactClass({
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
        this.fileInput = React.createRef();

        this.eventWs = new FFSWebSocket(this.props.id, (data, topics) => this.onWsUpdate(data));
    },
    onWsUpdate(data) {
        const { event_id, round_id, score, user_id } = data;
        if (this.props.id === event_id && this.state.roundId === round_id) {
            dispatchData('eventRoundDetail', data);
        }
    },
    componentWillUnmount() {
        this.eventWs.close();
    },
    save() {
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
        const tabs = (this.props.eventRoundList || [])
            .map((round, idx) => ({ label: 'Round ' + (idx + 1), isActive: this.state.roundId === round, onClick: () => this.onChangeRound(round) }));

        return <Tabs tabs={tabs}>{this.state.roundId && children}</Tabs>;
    },
    renderAlive(isWrapping = true) {
        const data = (this.props.userList || [])
            .filter(elt => {
                return !(this.props.eventRoundDetail || []).some(item => item.id === elt.twitchId && item.score)
            }).map(({ logo, score, username, twitchId, id }) => ({ logo, score, username, twitchId, id }));
        return this.renderList(data, isWrapping);
    },
    renderDead() {
        const toDisplay = (this.props.eventRoundDetail || [])
            .filter(elt => elt.score)
            .sort((a, b) => (a.score - b.score))
            .map(({ logo, score, username, twitchId, id }) => ({ logo, score, username, twitchId, id }));

        return this.renderList(toDisplay);
    },
    renderList(arr, isWrapping) {
        const elts = arr.map(elt => ({
            logoUrl: elt.logo,
            LineContent: <UserLine {...elt} />,
            onClick: (evt) => { evt.preventDefault(); evt.stopPropagation(); this.handleLineClick(elt); }
        }));
        return <List data-dd='empilable' isWrapping={isWrapping} dataList={elts} />;
    },
    handleLineClick(elt) {
        if (isModo()) {
            this.setState({
                displayPopin: true,
                fixTwitchId: elt.id || elt.twitchId
            })
        } else {
            this.setState({ channel: elt.username.toLowerCase() })
        }
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
    importResults(event) {
        event.preventDefault();
        const files = Array.prototype.map.call(event.target.files || event.dataTransfer.files, (elt) => elt);
        const file = files.length >= 1 ? files[0] : null;
        const reader = new FileReader();

        reader.onloadend = () => {
            const text = reader.result;
            text.replace(/\r/g, '').split('\n').map(elt => elt.split(';'))
                .forEach(([userId, , score], idx) => {
                    // Skipping header
                    if (idx === 0) {
                        return;
                    }

                    actions.updateUserScore({ id: this.props.id, idRound: this.state.roundId, idUser: userId, score }, this)
                });
        };
        reader.readAsText(file);
    },
    exportEmptyScoreFile() {
        const header = ['TwitchId;Pseudo;Score'];
        const data = (this.props.userList || [])
            .filter(({ status }) => status === 'VALIDATED')
            .sort((a, b) => a.username.localeCompare(b.username))
            .map(({ username, id, twitchId }) => `${id || twitchId};${username};${(this.props.eventRoundDetail.filter(({ id: scoreId }) => scoreId === (id || twitchId))[0] || {}).score || 0}`);
        const fileName = `${this.props.event.name}_score.csv`.replace(/ /g, '_');

        downloadData(header.concat(data).join('\n'), fileName, 'text/csv');
    },
    /** @inheritDoc */
    renderContent() {
        return (
            <div data-app='round-list-page' >
                {this.props.noLive && <h4 className='website-title'>{translate('label.rounds')}</h4>}
                < div className='pad-bottom' >
                    <div className='pad-buttons' >
                        <Button label='label.goToResults' onClick={() => { navigate(`event / ${this.props.id} / results`) }} />
                        {this.props.id && this.state.roundId && <Button label='label.refreshResult' onClick={() => { actions.getRoundScore({ id: this.props.id, idRound: this.state.roundId }); }} />}
                    </div>
                    {isAdmin() && <div><Button label='label.addRound' onClick={this.addRound} /></div>}
                    {isModo() && <div>
                        <Button label={'label.exportScore'} onClick={this.exportEmptyScoreFile} />
                    </div>}

                    {isModo() && <div>
                        <input type='file' ref={this.fileInput} hidden accept='text/csv' onChange={this.importResults} />
                        <Button label={'label.importScore'} onClick={() => this.fileInput.current.click()} />
                    </div>}

                    {this.state.roundId && this.renderRound()}
                    <div className='pad-buttons' style={{ display: 'flex' }} >
                        {isModo() && this.state.roundId && this.state.roundId !== 'ALL' &&
                                <Button label='label.updateParticipant' onClick={() => { this.setState({ displayPopin: true }) }} />
                        }
                        {isAdmin() && this.state.roundId && <Button label='label.deleteRound' onClick={this.deleteRound} />}

                    </div >
                </div >
                {this.state.roundId && <div>{!this.props.noLive && <h5 className='website-title'>{translate('label.alive')}</h5>}
                    {this.state.channel && (
                        <TwitchLive channel={this.state.channel} onPopinClose={() => this.setState({ channel: null })} >
                            <div>
                                <h5 className='website-title'>{translate('label.alive')}</h5>
                                {this.renderAlive(false)}
                                <h5 className='website-title'>{translate('label.dead')}</h5>
                                {this.renderDead()}
                            </div>
                        </TwitchLive>)}
                    {!this.props.noLive && this.renderAlive()}
                    {!this.props.noLive && <h5 className='website-title'>{translate('label.dead')}</h5>}
                    {this.renderDead()}
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

