import eventServices from '../services/event';
import actionBuilder from 'focus-core/application/action-builder';


export default {
    load: actionBuilder({
        node: 'eventDetail',
        service: eventServices.loadEvent,
        shouldDumpStoreOnActionCall: true,
        status: 'loaded'
    }),
    create: actionBuilder({
        node: 'eventDetail',
        service: eventServices.createEvent,
        shouldDumpStoreOnActionCall: true,
        status: 'saved'
    }),
    update: actionBuilder({
        node: 'eventDetail',
        service: eventServices.updateEvent,
        shouldDumpStoreOnActionCall: false,
        status: 'saved'
    }),
    list: actionBuilder({
        node: 'eventList',
        service: eventServices.loadEventList,
        shouldDumpStoreOnActionCall: false,
        status: 'saved'
    })
}
