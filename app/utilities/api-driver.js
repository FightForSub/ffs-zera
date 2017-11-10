import fetch from 'focus-core/network/fetch';
import urlBuilder from 'focus-core/util/url/builder';

import {defaults} from 'lodash';

const defaultOptions = {
    isCORS: false
};

const defaultMethod = 'GET';

const fetchBuilder = (urlFunc, urlData, data, options) => (
  fetch(
    urlFunc({
        urlData: urlData || {},
        data: data
    }), defaults({}, options, defaultOptions)
  )
);

const apiDriverBuilder = function apiDriverBuilder(urls) {
    const apiDriver = {};
    for (let prop in urls) {
        const url = urls[prop];
        apiDriver[prop] = (urlData, data, options) =>
              (
                fetchBuilder(
                    urlBuilder(url.url, url.method || defaultMethod),
                    urlData,
                    data,
                    options
                )
              )
    }
    return apiDriver;
}

export default apiDriverBuilder;
