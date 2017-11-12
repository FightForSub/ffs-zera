import { CoreStore } from 'focus-core/store';

/**
* Store dealing with subjects about persons.
* @type {focus}
*/
const eventStore = new CoreStore({
    definition: {
        eventList: 'eventList',
        eventDetail: 'eventDetail',
        eventUserList: 'eventUserList',
        eventUserDetail: 'eventUserDetail'
    }
});

eventStore.name = 'EventStore';

export default eventStore;