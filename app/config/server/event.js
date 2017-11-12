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
    }
});