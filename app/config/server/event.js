import apiDriverBuilder from 'focus-core/network/api-driver';
import { apiRoot } from './index'

export default apiDriverBuilder({
    create: {
        url: apiRoot + 'events',
        method: 'POST'
    },
    load: {
        url: apiRoot + 'event/${id}'
    },
    search: {
        url: apiRoot + 'events',
        method: 'GET'
    },
    update: {
        url: apiRoot + 'event/${id}',
        method: 'PUT'
    },
    listUsers: {
        url: apiRoot + 'event/${id}/users',
        method: 'GET'
    },
    addUser: {
        url: apiRoot + 'event/${id}/users',
        method: 'POST'
    },
    getUser: {
        url: apiRoot + 'event/${id}/user/${idUser}',
        method: 'GET'
    },
    updateUser: {
        url: apiRoot + 'event/${id}/user/${idUser}',
        method: 'PUT'
    },
    deleteUser: {
        url: apiRoot + 'event/${id}/user/${idUser}',
        method: 'DELETE'
    },
    getRounds: {
        url: apiRoot + 'event/${id}/rounds',
        method: 'GET'
    },
    getRoundScore: {
        url: apiRoot + 'event/${id}/round/${idRound}',
        method: 'GET'
    },
    createRound: {
        url: apiRoot + 'event/${id}/rounds',
        method: 'POST'
    },
    deleteRound: {
        url: apiRoot + 'event/${id}/round/${idRound}',
        method: 'DELETE'
    },
    updateUserScore: {
        url: apiRoot + 'event/${id}/round/${idRound}/score/${idUser}',
        method: 'PUT'
    },
    getCurrentEvent: {
        url: apiRoot + 'event/current',
        method: 'GET'
    }
});