var path = require('path'),
    webpack = require('webpack'),
    production = require('yargs').argv.production;

module.exports = {
    entry: './index.js',

    output: {
        publicPath: '/',
        path: __dirname,
        filename: 'generated/bundle.js'
    },

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                cacheDirectory: true,
                presets: ['es2015-loose', 'stage-0'],
                plugins: ['transform-es2015-spread', 'transform-runtime']
            }
        }]
    },

    externals: {
        'three': 'THREE'
    },

    worker: { output: { filename: 'generated/worker.js' } },
    plugins: [
        new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } })
    ].concat(production ? [
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: true, compress: { warnings: false } })
    ] : []),

    devServer: { contentBase: './' },
    devtool: production ? undefined : 'source-map',
    cache: true,
    debug: !production
};
