import React from 'react';
import { component as List } from 'focus-components/list/selection/list';
import { translate } from 'focus-core/translation';
import LineComponent from './line';

const initDataList = [
    { id: 1, alias: 'Le streamer 1', nbKill: 0, isDead: false },
    { id: 6, alias: 'Le streamer 1 mort', nbKill: 8, isDead: true },

    { id: 2, alias: 'Le streamer 2', nbKill: 4, isDead: false },
    { id: 7, alias: 'Le streamer 2 mort', nbKill: 8, isDead: true },

    { id: 3, alias: 'Le streamer 3', nbKill: 8, isDead: false },
    { id: 4, alias: 'Le streamer 4', nbKill: 9, isDead: false },
    { id: 8, alias: 'Le streamer 3 mort', nbKill: 8, isDead: true },
    { id: 5, alias: 'Le streamer 5', nbKill: 8, isDead: false }
];
export default React.createClass({
    displayName: 'ParticipantsView',

    /** @inheritDoc */
    render() {
        return (
            <div data-app='homepage'>
                <h3 className='website-title'>{translate('label.participants')}</h3>
                <List data={initDataList} LineComponent={LineComponent} isSelection={false} />
            </div>
        );
    }
});
