import { isObject } from 'lodash/lang';
import { entries } from 'lodash/object';
/**
 * Utility function, to build a query string from an object
 * 
 * @param {object} obj the object to serialize in a query string
 * @param {string} [prefix=''] the name of the object in the query string
 * @returns {string} the built query string
 */
const buildQueryString = (obj, prefix = '') => {
    let queryString = '';
    if (isObject(obj)) {
        queryString = entries(obj).reduce((acc, [key, value]) => {
            return acc + (acc && acc !== '' && !acc.endsWith('&') ? '&' : '') + buildQueryString(value, prefix !== '' ? prefix + '.' + key : key);
        }, '');
    } else if (prefix && prefix !== '') {
        queryString = prefix + '=' + encodeURIComponent(obj);
    }
    return queryString;
};


export default buildQueryString;