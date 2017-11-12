import apiDriverBuilder from 'focus-core/network/api-driver';
import { apiRoot } from './index'

export default apiDriverBuilder({
    login: {
        url: apiRoot + 'account/login',
        method: 'POST'
    }
});