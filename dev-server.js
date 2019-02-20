#!/usr/bin/env node

const serverLauncher = require('webpack-focus').serverLauncher;
// We take the config relative to the process folder, assuming user launch command from project folder
const webpackConfig = require(process.cwd() + '/webpack.config');
serverLauncher(webpackConfig, {
    // https: true,
    // headers: {
    //     'Content-Security-Policy': "block-all-mixed-content;default-src 'self' https://ffs-api-test.zerator.com;connect-src 'self' wss://localhost:3000 https://ffs-api-test.zerator.com wss://pubsub-ffs-test.zerator.com https://api.twitch.tv/;font-src 'self';frame-src https://player.twitch.tv/ https://www.twitch.tv/;img-src 'self' data: https://static-cdn.jtvnw.net;media-src 'none';object-src 'none';script-src 'self' 'unsafe-eval' https://www.google-analytics.com 'sha256-ada970e57c045a79233c83a2fc455b4747fea8efb97a8d469079b216d07fb00c';style-src 'unsafe-inline' 'self';worker-src 'none';"
    // }
    disableHostCheck: true
});
