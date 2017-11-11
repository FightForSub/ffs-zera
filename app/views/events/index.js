import React from 'react';
import { navigate } from '../../utilities/router';
import { component as List } from 'focus-components/list/selection/list';
import { translate } from 'focus-core/translation';
import LineComponent from './line';
import Button from 'focus-components/components/button';
import { component as Popin } from 'focus-components/application/popin';
import AddPopin from './add-popin';

const initDataList = [
    { id: 1, name: 'Event 1', date: '2017-11-22T00:00:00.000Z' },
    { id: 2, name: 'Event 2', date: '2017-11-23T00:00:00.000Z' },
    { id: 3, name: 'Event 3', date: '2017-11-24T00:00:00.000Z' },
    { id: 4, name: 'Event 4', date: '2017-11-25T00:00:00.000Z' },
    { id: 5, name: 'Event 5', date: '2018-11-22T00:00:00.000Z' }
];
export default React.createClass({
    displayName: 'EventsView',
    getInitialState() {
        return { displayPopin: false }
    },

    /** @inheritDoc */
    render() {
        return (
            <div data-app='events-page'>
                <h3 className='website-title'>{translate('label.events')}</h3>
                <Button label='label.createEvent' onClick={() => this.setState({ displayPopin: true })} />
                <List data={initDataList} LineComponent={LineComponent} isSelection={false} onLineClick={data => navigate(`event/${data.id}`)} />
                {this.state.displayPopin && <Popin open type='from-right' onPopinClose={() => this.setState({ displayPopin: false })} >
                    <AddPopin hasLoad={false} isEdit onSave={() => this.setState({ displayPopin: false })} />
                </Popin>}
            </div>
        );
    }
});
