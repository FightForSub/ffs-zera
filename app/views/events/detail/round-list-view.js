import React, { Component } from 'react';
// import { component as List } from 'focus-components/list/selection/list';
import List from '../../../components/list';
import { mixin as formPreset } from 'focus-components/common/form';

import { translate } from 'focus-core/translation';
import Button from 'focus-components/components/button';
import { component as Popin } from 'focus-components/application/popin';
import connectToStore from 'focus-components/behaviours/store/connect';
import SelectInput from 'focus-components/components/input/select';


import EventStore from '../../../stores/event';
import { dispatchData } from 'focus-core/dispatcher';

import actions from '../../../action/event';

// const LineComponent = (data) => (<div>{JSON.stringify(data)}</div>)
// import LineComponent from './round-line';
// import AddPopin from './add-popin';
// import {navigate} from '../../utilities/router';


// {"id": 3,"name":"TestName","description":"TestDesc","reservedToAffiliates":false,"reservedToPartners":false,"status":"OPEN","current":false}
export default connectToStore([{
    store: EventStore,
    properties: ['eventRoundList', 'eventRoundDetail', 'eventUserList']
}], () => ({ eventRoundList: EventStore.getEventRoundList(), eventRoundDetail: EventStore.getEventRoundDetail(), userList: EventStore.getEventUserList() || [] }))
(React.createClass({
    mixins: [formPreset],
    definitionPath: 'user',
    getInitialState() {
        return { displayPopin: false, modeViewer: true }
    },

    actions: {},
    // constructor(props) {
    //     super(props);
    //     this.onChangeRound = this.onChangeRound.bind(this);
    //     this.renderLine = this.renderLine.bind(this);

    //     this.state = { displayPopin: false, modeViewer: true };
    // },
    componentWillMount() {
        actions.getRounds(this.props.id);
        this.action.save = this.save;
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
        }
    },
    renderLine({ username, twitchId, score }) {
        // <div>{'TwitchId: ' + twitchId}</div>

        return (
            <span className='detail-user-line-content'>
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
        actions.deleteRound({ id: this.props.id, idRound: this.state.roundId }).then(() => {
            actions.getRounds(this.props.id);
        });
    },
    /** @inheritDoc */
    renderContent() {
        // [{ code: 'ALL', label: 'select.all' }].concat(
        const toDisplay = (this.props.eventRoundDetail || [])
            .sort((a, b) => (b.score - a.score))
            .map(elt => ({
                logoUrl: elt.logo,
                LineContent: this.renderLine(elt),
                onClick: () => {
                    if (!this.state.modeViewer) {
                        this.setState({
                            displayPopin: true,
                            fixTwitchId: elt.id
                        })
                    }
                }
            }));
        return (
            <div data-app='round-list-page'>
                <h4 className='website-title'>{translate('label.rounds')}</h4>
                <div className='pad-bottom'>
                    <div><Button label={'Swap Mode to :' + (!this.state.modeViewer ? 'Viewer' : 'Modo')} onClick={() => { this.setState({ modeViewer: !this.state.modeViewer }) }} /></div>
                    {!this.state.modeViewer && <div><Button label='label.addRound' onClick={this.addRound} /></div>}

                    <div className='pad-buttons' style={{ display: 'flex' }}>
                        <SelectInput
                            value={this.state.roundId}
                            values={(this.props.eventRoundList || []).map((elt, idx) => ({ code: elt, label: 'Round ' + (idx + 1) }))}
                            onChange={this.onChangeRound}
                            hasUndefined={false}
                        />
                        {!this.state.modeViewer && this.state.roundId && this.state.roundId !== 'ALL' &&
                                <Button label='label.updateParticipant' onClick={() => { dispatchData('eventDetail', null); this.setState({ displayPopin: true }) }} />
                        }
                        {!this.state.modeViewer && this.state.roundId && <Button label='label.deleteRound' onClick={this.deleteRound} />}

                    </div>
                </div>
                <List data-dd='empilable' dataList={toDisplay} />
                {this.state.displayPopin && !this.state.modeViewer && <Popin open type='from-right' onPopinClose={() => this.setState({ displayPopin: false, twitchId: null, fixTwitchId: null, score: null })} >
                    <h4 className='website-title'>{translate('label.updateScore')}</h4>
                    {this.fieldFor('twitchId', { isEdit: !this.state.fixTwitchId, value: this.state.fixTwitchId || this.state.twitchId, values: (this.props.userList || []).map(({ twitchId, username }) => ({ code: twitchId, label: username })) })}
                    {this.fieldFor('score', { isEdit: true })}
                    {this.buttonSave()}
                    {/* <UserPopin hasLoad={false} isEdit id={this.props.params.id} idUser={this.state.twitchId} onSave={() => this.setState({ displayPopin: false })} /> */}
                </Popin>}

            </div>
        );
    }
}));

