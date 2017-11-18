import React from 'react';
import { translate } from 'focus-core/translation';
// import eventActions from '../../action/event';
import { component as List } from 'focus-components/list/selection/list';
import { mixin as lineMixin } from 'focus-components/list/selection/line';

import eventServices from '@/services/event';

const LineComponent = React.createClass({
    displayName: 'ResultLineView',
    mixins: [lineMixin],
    definitionPath: 'results',
    /** @inheritDoc */
    renderLineContent({ rank, logo, username, total }) {
        return (
            <div data-app='line-results'>
                {this.fieldFor('rank')}
                {!logo ? <i /> : <i className={'mdl-list__item-avatar'} style={{ backgroundImage: `url(${logo}`, backgroundSize: 'contain' }} />}
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
        const servicesCall = eventServices.getRounds(eventId)
            .then(eventRoundList => {
                return (eventRoundList || [])
                    .map(elt => {
                        return eventServices.getRoundScore({ id: eventId, idRound: elt });
                    });
            });
        servicesCall.then(arrayPromise => Promise.all(arrayPromise))
            .then(arrResult => {
                this.setState({ results: arrResult });
            });
    }

    componentWillMount() {
        const eventId = this.props.params.id;
        eventServices.listUsers(eventId).then(res => this.setState({ participants: res }));
        this.loadData();
        this.handle = window.setInterval(() => {
            if (this.props.params.id && this.state.participants) {
                this.loadData()
            }
        }, 3 * 1000)
    }

    componentWillUnmount() {
        window.clearInterval(this.handle);
    }

    buildResults() {
        const toReturn = (this.state.participants || []).map(({ logo, twitchId, username }) => {
            const part = { logo, twitchId, username };

            this.state.results
                .forEach((arrRes, idx) => {
                    part['round' + (idx + 1)] = arrRes.filter(elt => elt.id === twitchId).reduce((acc, elt) => (elt.score || '?'), '?');
                });
            part.total = this.state.results
                .map((arrRes) => arrRes.filter(elt => elt.id === twitchId).reduce((acc, elt) => ((+elt.score) || 0), 0))
                .reduce((acc, score) => acc + score, 0);

            return part;
        })
            .sort((a, b) => a.total - b.total)
            .map((elt, idx) => { elt.rank = idx + 1; return elt; });

        const firstLine = { total: 'Total', username: 'Pseudo', rank: 'Classement' };
        this.state.results
            .forEach((arrRes, idx) => {
                firstLine['round' + (idx + 1)] = 'Round ' + (idx + 1);
            });

        toReturn.unshift(firstLine);

        return toReturn;
    }


    /** @inheritDoc */
    render() {
        const results = this.buildResults() || [];
        return (
            <div data-app='results-page' >
                <h3 className='website-title'>{translate('label.results')}</h3>
                <List nbRounds={this.state.results && this.state.results.length || 0} data={results} LineComponent={LineComponent} isSelection={false} onLineClick={() => { }} />
            </div >
        );
    }
}

export default StatsView;
