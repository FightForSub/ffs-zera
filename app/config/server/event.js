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
    }
});