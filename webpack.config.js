const baseConfig = require('webpack-focus/config/default');
const envParser = require('webpack-focus/webpack-utilities/env-parser');

const myConfig = baseConfig(process.env, {});
const parsedEnv = envParser(process.env);
myConfig.addDefinedVariable('__CLIENT_ID__', JSON.stringify(parsedEnv.CLIENT_ID));
myConfig.addDefinedVariable('__BASE_URL__', JSON.stringify(parsedEnv.BASE_URL));
myConfig.addDefinedVariable('__ROOT_URL__', JSON.stringify(parsedEnv.ROOT_URL));
myConfig.addDefinedVariable('__WS_SOCKET_URL__', JSON.stringify(parsedEnv.WS_SOCKET_URL));
myConfig.addDefinedVariable('__IS_VERTIGO__', 'false');

myConfig.addAlias('@', './app');

module.exports = myConfig.toWebpackConfig(parsedEnv);