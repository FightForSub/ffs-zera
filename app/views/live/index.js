import React from 'react';
import { translate } from 'focus-core/translation';
import List from '../../components/list';
import Button from 'focus-components/components/button';

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
    displayName: 'LiveView',
    getInitialState() {
        return {
            dataList: initDataList,
            modeViewer: true
        };
    },
    updateState(id, isDead) {
        const { dataList } = this.state;
        this.setState({ dataList: dataList.map(elt => elt.id !== id ? elt : { ...elt, isDead }) })
    },
    renderLine({ alias, nbKill }) {
        return (<div className='live-line-content'>
            <div>{alias}</div>
            <div>{'Kills: ' + nbKill}</div>
        </div>);
    },
    buildAction({ isDead, id }) {
        return {
            iconText: isDead ? 'restore' : 'delete',
            action: () => this.updateState(id, !isDead)
        }
    },
    /** @inheritDoc */
    displayPopin(elt) {

    },
    render() {
        const { dataList, modeViewer } = this.state;
        const toDisplayAlive = dataList.filter(elt => !elt.isDead)
            .map(elt => ({
                avatar: { iconText: elt.isDead ? 'close' : 'face' },
                LineContent: this.renderLine(elt),
                actions: !modeViewer ? [this.buildAction(elt)] : null,
                onClick: () => { }
            }));
        const toDisplayDead = dataList.filter(elt => elt.isDead)
            .map(elt => ({
                avatar: { iconText: elt.isDead ? 'close' : 'face' },
                LineContent: this.renderLine(elt),
                actions: !modeViewer ? [this.buildAction(elt)] : null,
                onClick: () => { }
            }));

        return (
            <div data-app='live-page'>
                <h3 className='website-title'>{translate('website.live')}</h3>
                <div>
                    <Button label={'Swap Mode to :' + (!this.state.modeViewer ? 'Viewer' : 'Modo')} onClick={() => { this.setState({ modeViewer: !this.state.modeViewer }) }} />
                </div>
                <h4 className='website-title'>{translate('label.alive')}</h4>
                <List data-dd='empilable' dataList={toDisplayAlive} isWrapping />
                <h4 className='website-title'>{translate('label.dead')}</h4>
                <List data-dd='empilable' dataList={toDisplayDead} isWrapping />
            </div>
        );
    }
});
