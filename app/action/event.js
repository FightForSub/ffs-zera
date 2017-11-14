import eventServices from '../services/event';
import actionBuilder from 'focus-core/application/action-builder';


export default {
    load: actionBuilder({
        node: 'eventDetail',
        service: eventServices.loadEvent,
        shouldDumpStoreOnActionCall: true,
        status: 'loaded'
    }),
    getCurrentEvent: actionBuilder({
        node: 'eventDetail',
        service: eventServices.getCurrentEvent,
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
        shouldDumpStoreOnActionCall: true,
        status: 'loaded'
    }),
    listUsers: actionBuilder({
        node: 'eventUserList',
        service: eventServices.listUsers,
        shouldDumpStoreOnActionCall: true,
        status: 'loaded'
    }),
    addUser: actionBuilder({
        node: 'eventUserDetail',
        service: eventServices.addUser,
        shouldDumpStoreOnActionCall: false,
        status: 'saved'
    }),
    getUser: actionBuilder({
        node: 'eventUserDetail',
        service: eventServices.getUser,
        shouldDumpStoreOnActionCall: true,
        status: 'loaded'
    }),
    updateUser: actionBuilder({
        node: 'eventUserDetail',
        service: eventServices.updateUser,
        shouldDumpStoreOnActionCall: false,
        status: 'saved'
    }),
    deleteUser: actionBuilder({
        node: 'eventUserDetail',
        service: eventServices.deleteUser,
        shouldDumpStoreOnActionCall: false,
        status: 'saved'
    }),
    getRounds: actionBuilder({
        node: 'eventRoundList',
        service: eventServices.getRounds,
        shouldDumpStoreOnActionCall: true,
        status: 'loaded'
    }),
    getRoundScore: actionBuilder({
        node: 'eventRoundDetail',
        service: eventServices.getRoundScore,
        shouldDumpStoreOnActionCall: false,
        status: 'loaded'
    }),
    createRound: actionBuilder({
        node: 'eventRoundUpdate',
        service: eventServices.createRound,
        shouldDumpStoreOnActionCall: true,
        status: 'saved'
    }),
    deleteRound: actionBuilder({
        node: 'eventRoundUpdate',
        service: eventServices.deleteRound,
        shouldDumpStoreOnActionCall: true,
        status: 'saved'
    }),
    updateUserScore: actionBuilder({
        node: 'eventRoundUpdate',
        service: eventServices.updateUserScore,
        shouldDumpStoreOnActionCall: true,
        status: 'saved'
    })
}
