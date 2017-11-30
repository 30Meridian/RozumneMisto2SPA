'use strict';

const path = require('path');
const cwd = process.cwd();
const webpack = tars.require('webpack');

const staticFolderName = tars.config.fs.staticFolderName;
const compressJs = tars.flags.release || tars.flags.min;
const generateSourceMaps = tars.config.sourcemaps.js.active && tars.isDevMode;
const sourceMapsDest = tars.config.sourcemaps.js.inline ? 'inline-' : '';
const sourceMapsType = `#${sourceMapsDest}source-map`;

let outputFileNameTemplate = '[name]';
let modulesDirectories = ['node_modules'];
let preLoaders = [
    {
        test: /\.js$/,
        loader: 'source-map-loader'
    }
];
let loaders = [
  {
    test: /\.json$/,
    loader: 'json'
  },
  {
    test: /\.css$/,
    loader: 'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]'
  },
  { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
  { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
  {
      test: /\.scss$/,
      loader: 'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader'
  },
];
let plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
    })
];

if (process.env.npmRoot) {
    modulesDirectories.push(process.env.npmRoot);
}

if (compressJs) {
    outputFileNameTemplate += `${tars.options.build.hash}.min`;
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                /* eslint-disable camelcase */
                drop_console: tars.config.js.removeConsoleLog,
                drop_debugger: tars.config.js.removeConsoleLog
                /* eslint-enable camelcase */
            },
            mangle: false
        }),
        new webpack.optimize.DedupePlugin()
    );
}

if (tars.config.js.webpack.providePlugin) {
    plugins.push(
        new webpack.ProvidePlugin(tars.config.js.webpack.providePlugin)
    )
}

if (tars.options.watch.isActive && tars.config.js.webpack.useHMR) {
    plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}

if (tars.config.js.lint) {
    preLoaders.push(
        {
            test: /\.js$/,
            loader: 'eslint-loader',
            include: `${cwd}/markup`
        }
    );
}

if (tars.config.js.useBabel) {
    preLoaders.push(
        {
            test: /\.js$/,
            loader: 'babel',
            include: /markup/
        }
    );
}

/**
 * Add to each entry point entries for webpack dev-server and webpack-hot-middleware
 * @param  {Object} entryConfig
 * @return {Object}
 */
function prepareEntryPoints(entryConfig) {
    const useHMR = tars.config.js.webpack.useHMR;
    let devServerEntryPoints = [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client?reload=true'
    ];

    if (!useHMR || !tars.useLiveReload) {
        return entryConfig;
    }

    // Take webpack dev-server and webpack-hot-middleware from TARS-CLI, if TARS has been started by TARS-CLI
    if (process.env.npmRoot) {
        devServerEntryPoints = devServerEntryPoints.map(devServerEntryPoint => process.env.npmRoot + devServerEntryPoint);
    }

    /* eslint-disable guard-for-in */
    for (let entryPointName in entryConfig) {
        entryConfig[entryPointName] = devServerEntryPoints.concat(entryConfig[entryPointName]);
    }
    /* eslint-disable guard-for-in */

    return entryConfig;
}

module.exports = {
    // We have to add some pathes to entry point in case of using HMR
    entry: prepareEntryPoints({
      index: path.resolve(`${cwd}/markup/components/system/index.js`),
      vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'redux',
      'redux-thunk',
      'react-redux',
      'immutable',
      'leaflet',
      'react-leaflet',
      'recharts',
      'react-datepicker',
      'react-ckeditor-wrapper',
      'react-modal',
      'react-bootstrap',
      ]
    }),

    output: {
        path: path.resolve(`${cwd}/dev/${staticFolderName}/js`),
        publicPath: `./${staticFolderName}/js/`,
        filename: `${outputFileNameTemplate}.js`
    },

    devtool: generateSourceMaps ? sourceMapsType : null,

    watch: tars.options.watch.isActive && !tars.config.js.webpack.useHMR,

    module: {
        preLoaders,
        loaders
  },


    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: module => module.context && module.context.indexOf('node_modules') !== -1
      }),
    ],

    resolveLoader: {
        modulesDirectories
    },

    resolve: {
        alias: {
            modules: path.resolve(`./markup/${tars.config.fs.componentsFolderName}`),
            components: path.resolve(`./markup/${tars.config.fs.componentsFolderName}`),
            static: path.resolve(`./markup/${staticFolderName}`),
            jquery: "jquery/src/jquery",
        },
    },

    eslint: {
        configFile: `${cwd}/.eslintrc`
    }
};
