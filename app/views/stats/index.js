import React from 'react';
import createReactClass from 'create-react-class';
import { translate } from 'focus-core/translation';
import { component as List } from 'focus-components/list/selection/list';
import { mixin as lineMixin } from 'focus-components/list/selection/line';
import Button from 'focus-components/components/button';
import { flatMap } from 'lodash/collection';

import eventServices from '@/services/event';
import FFSWebSocket from '@/utilities/web-socket';
import { isAdmin } from '@/utilities/check-rights';
import { compare, defaultValue } from '@/utilities/ranking-sort';

const LineComponent = createReactClass({
    displayName: 'ResultLineView',
    mixins: [lineMixin],
    definitionPath: 'results',
    /** @inheritDoc */
    renderLineContent({ rank, logo, username, total }) {
        return (
            <div data-app='line-results'>
                {this.fieldFor('rank')}
                {!logo ? <i /> : <i className={'mdl-list__item-avatar'} style={{ backgroundImage: `url(${logo})`, backgroundSize: 'contain' }} />}
                {this.fieldFor('username')}
                {Array(this.props.nbRounds).fill(0).map((elt, idx) => this.fieldFor('round' + (idx + 1)))}
                {this.fieldFor('total')}
            </div>
        );
    }
});


class StatsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            participants: [],
            results: []
        };
    }

    loadData() {
        const eventId = this.props.params.id;
        eventServices.getRoundsWithScore(eventId)
            .then(eventRoundList => {

                const sortedRounds = Object.entries(eventRoundList)
                    .map(([id, scores]) => [+id, scores])
                    .sort(([a,], [b,]) => a - b);

                const participants = [];
                const ids = new Set();
                flatMap(sortedRounds, ([, scores]) => scores)
                    .forEach(({ id, logo, url, username }) => {
                        if (!ids.has(id)) {
                            ids.add(id);
                            participants.push({
                                id,
                                logo,
                                username,
                                url
                            });
                        }
                    });

                this.setState({
                    eventRoundList: sortedRounds.map(([id,]) => id),
                    results: sortedRounds.map(([, scores]) => scores),
                    participants
                });
            });
    }

    componentWillMount() {
        // const eventId = this.props.params.id;
        // eventServices.listUsers({ id: eventId, status: 'VALIDATED' }).then(res => this.setState({ participants: res }));
        eventServices.loadEvent(this.props.params.id).then(res => this.setState({ event: res }));
        this.loadData();
        this.eventWs = new FFSWebSocket(this.props.params.id, (data, topics) => this.onWsUpdate(data));
    }

    onWsUpdate(data) {
        const { event_id, round_id, score, user_id } = data;
        if (+this.props.params.id === event_id) {
            const roundIdx = (this.state.eventRoundList || []).indexOf(round_id);
            if (roundIdx === -1) {
                this.loadData();
            } else {
                this.setState(({ results, participants }, props) => {
                    const roundScore = results[roundIdx];
                    let found = false;
                    roundScore.forEach(elt => {
                        if (elt.id === user_id) {
                            found = true;
                            elt.score = score;
                        }
                    })
                    if (!found) {
                        const part = participants.find(elt => elt.id === user_id);
                        if (part) {
                            const { username, url, logo, id } = part;
                            roundScore.push({ id, username, url, logo, score });
                        }
                    }
                    return { results };
                });
            }
        }
    }

    componentWillUnmount() {
        this.eventWs.close();
    }

    buildResults() {
        if (!this.state.event) {
            return [];
        }
        const rankingType = this.state.event.rankingType;
        const compareRanks = compare[rankingType];
        const defaultScore = defaultValue[rankingType];

        const toReturn = (this.state.participants || []).map(({ logo, id: twitchId, username }) => {
            const part = { logo, twitchId, username };

            this.state.results
                .forEach((arrRes, idx) => {
                    part['round' + (idx + 1)] = arrRes.filter(elt => elt.id === twitchId).reduce((acc, elt) => (Math.abs(elt.score) || '?'), '?');
                });
            part.total = this.state.results
                .map((arrRes) => +((arrRes.find(elt => elt.id === twitchId) || {}).score || 0))
                .reduce((acc, score) => acc + score, 0);

            part.hiddenTotal = this.state.results
                .map((arrRes) => +((arrRes.find(elt => elt.id === twitchId) || {}).score || defaultScore))
                .reduce((acc, score) => acc + score, 0);

            part.total = Math.abs(part.total);

            return part;
        })
            .sort((a, b) => compareRanks(a.hiddenTotal, b.hiddenTotal))
            .map((elt, idx) => ({ ...elt, rank: idx + 1 }));

        const firstLine = { total: 'Total', username: 'Pseudo', rank: 'Classement' };
        this.state.results
            .forEach((arrRes, idx) => {
                firstLine['round' + (idx + 1)] = 'Round ' + (idx + 1);
            });

        toReturn.unshift(firstLine);

        return toReturn;
    }

    // refreshResult = () => {
    //     if (isAdmin()) {
    //         let results = this.buildResults();
    //         results.shift();
    //         results.forEach(({ twitchId, rank }) => {
    //             eventServices.updateUserRank({ id: this.props.params.id, idUser: twitchId, rank: rank });
    //         });
    //     }
    // };


    /** @inheritDoc */
    render() {
        const results = this.buildResults() || [];
        return (
            <div data-app='results-page' >
                <h3 className='website-title'>{translate('label.results')}</h3>
                {/* {isAdmin() && <div><Button label='label.refreshResult' onClick={this.refreshResult} /></div>} */}
                <List nbRounds={this.state.results && this.state.results.length || 0} data={results} LineComponent={LineComponent} isSelection={false} onLineClick={() => { }} />
            </div >
        );
    }
}

export default StatsView;
