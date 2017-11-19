import { CoreStore } from 'focus-core/store';
import Immutable from 'immutable';
import { isFunction } from 'lodash/lang';
/**
* Store dealing with subjects about persons.
* @type {focus}
*/
class EventStore extends CoreStore {

    updateEventRoundDetail(dataNode, status, informations) {
        // Managing manually, to handle update of one element
        if (Array.isArray(dataNode) || !dataNode) {
            const immutableNode = isFunction(dataNode) ? dataNode : Immutable.fromJS(dataNode);
            this.data = this.data.set('eventRoundDetail', immutableNode);
        } else {
            const { event_id, round_id, score, user_id } = dataNode;
            let scorelist = this.getEventRoundDetail() || [];

            let elt = scorelist.find(elt => elt.id === user_id);
            if (!elt) {
                const user = (this.getEventUserList() || []).find(elt => elt.twitchId === user_id);
                if (user) {
                    const { username, url, logo, twitchId } = user;
                    elt = { id: twitchId, username, url, logo };
                    scorelist.push(elt);
                }
            }
            if (elt) {
                elt.score = score;
            }
            this.data = this.data.set('eventRoundDetail', Immutable.fromJS(scorelist));
        }
        this.status = this.status.set('eventRoundDetail', status);
        this.willEmit('eventRoundDetail:change', { property: 'eventRoundDetail', status: status, informations: informations });
    }

}

const eventStore = new EventStore({
    definition: {
        eventList: 'eventList',
        eventDetail: 'eventDetail',
        eventUserList: 'eventUserList',
        eventUserDetail: 'eventUserDetail',
        eventRoundList: 'eventRoundList',
        eventRoundDetail: 'eventRoundDetail',
        eventRoundUpdate: 'eventRoundUpdate'
    }
});

eventStore.name = 'EventStore';

export default eventStore;
