var path = require('path'),
    webpack = require('webpack');

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

    plugins: [
        new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.UglifyJsPlugin({ mangle: true, compress: { warnings: false } })
    ],

    devServer: { contentBase: './' },
    cache: true,
    debug: false
};
