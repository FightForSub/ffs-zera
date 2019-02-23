const devServer = require('@thc/webpack-quark-dev-server/lib/dev-server');
const webpackConf = require('./webpack.config.js');

const customConfig = {
    disableHostCheck: true
};

devServer(webpackConf(process.env), customConfig);
