

const handleAssets = require('@thc/webpack-quark-assets');
const handleJs = require('@thc/webpack-quark-babel');
const handleScss = require('@thc/webpack-quark-scss');
const configEntries = require('@thc/webpack-quark-entry');
const addHotReload = require('@thc/webpack-quark-dev-server');
const addHtmlIndex = require('@thc/webpack-quark-html');
const miscOptions = require('@thc/webpack-quark-misc');
const optimize = require('@thc/webpack-quark-optimize');
const configOutput = require('@thc/webpack-quark-output');
const generateSourcemap = require('@thc/webpack-quark-sourcemap');

const path = require('path');
const webpack = require('webpack');

const { envDefaults, createConfigurator } = require('@thc/webpack-chemistry');

const enhanceForHotReload = entries => {
    return [
        '@thc/webpack-quark-dev-server/lib/react-hot-dev-client',
        'react-error-overlay',
        'webpack/hot/only-dev-server'
    ].concat(entries);
};

module.exports = (processEnv, argv) => {
    const env = envDefaults(processEnv);
    // Every function accepts a config object
    // Object is gonna be shallow merged with default conf
    // Allow simple filtering, by setting the function as booleanTest && config()
    const hotReload = env.HOT_RELOAD;
    const isProd = env.NODE_ENV === 'production';
    const configurator = createConfigurator(
        env, // Environnement variables (used for default values)
        argv, // Argv options given to webpack (not used for now, only for respecting webpack format)
        // List of blocks
        handleJs({
            test: /\.jsx?$/,
            extensions: ['.js', '.jsx'],
            exclude: { and: [/node_modules/, { not: [/focus-components(?!\/node_modules)/, /focus-core(?!\/node_modules)/] }] },
            useCache: false,
            babelOptions: {
                presets: [
                    [
                        '@thc/babel-preset-react',
                        {
                            mode: env.NODE_ENV,
                            hot: hotReload
                        }
                    ]
                ],
                babelrc: false
            }
        }),
        handleScss({ extractCss: !hotReload }),
        handleAssets({ defaultsExclude: [/\.ejs$/, /\.jsx?$/, /\.s?css$/, /\.json$/] }),
        configEntries({
            polyfill: ['@babel/polyfill', 'classlist-polyfill',/*Needed for Opera Mini*/ 'whatwg-fetch'],
            entries: { main: ['./app/initializer/scripts/translation-initializer', './app'] },
            enhance: hotReload ? enhanceForHotReload : false
        }),

        addHotReload({
            hot: hotReload,
            serverConfig: {
                __DEV_SERVER_PROTOCOL__: env.DEV_SERVER_PROTOCOL,
                __DEV_SERVER_HOST__: env.DEV_SERVER_HOST,
                __DEV_SERVER_PORT__: env.DEV_SERVER_PORT,
                __DEV_SERVER_SUBDOMAIN__: env.DEV_SERVER_SUBDOMAIN
            }
        }),
        addHtmlIndex(),
        miscOptions({
            analyze: env.ANALYZE
        }),
        optimize({
            minimize: isProd,
            mode: env.NODE_ENV,
            bail: isProd
        }),
        configOutput({
            path: env.OUTPUT_DIR,
            publicPath: env.OUTPUT_PUBLIC_PATH
        }),
        generateSourcemap({
            devtool: isProd ? 'none' : 'cheap-eval-source-map',
            test: /\.jsx?$/
        })
    );

    // const envs = Object.entries(processEnv).

    // Configurator can take a already built object config to complete
    // const config = { module: { rules: [ test:'lol', loader:'example']}};
    // return configurator(config);
    return configurator({
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'app'),
                immutable: path.resolve(__dirname, 'node_modules/immutable'),
                react: path.resolve(__dirname, 'node_modules/react'),
                'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
                moment: path.resolve(__dirname, 'node_modules/moment'),
                'material-design-lite': path.resolve(__dirname, 'node_modules/material-design-lite'),
                'lodash/lang/isObject': path.resolve(__dirname, 'node_modules/lodash/isObject')
                // lodash: path.resolve(__dirname, 'node_modules/lodash')
            }
        },
        module: {
            rules: [
                {
                    test: /react-rte/,
                    use: 'null-loader'
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                __DEV__: hotReload,
                __API_ROOT__: JSON.stringify(processEnv.API_ROOT),
                __ROOT_URL__: JSON.stringify(processEnv.ROOT_URL),
                __BASE_URL__: JSON.stringify(processEnv.BASE_URL),
                __CLIENT_ID__: JSON.stringify(processEnv.CLIENT_ID),
                __IS_VERTIGO__: false,
                __WS_SOCKET_URL__: JSON.stringify(processEnv.WS_SOCKET_URL)
                // __ANCHOR_CLASS__: JSON.stringify(processEnv.ANCHOR_CLASS)
            })
        ]
    });
};
