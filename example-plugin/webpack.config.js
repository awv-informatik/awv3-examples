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
        loaders: [
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
            { test: /\.vue$/, loader: 'vue', exclude: /node_modules/ },
            { test: /\.json$/, loader: 'json', exclude: /node_modules/ },
            { test: /\.html$/, loader: 'vue-html', exclude: /node_modules/ },
            { test: /\.(png|jpg|gif|svg)$/, loader: 'url?limit=10000!img?minimize&optimizationLevel=5&progressive=true&name=generated/[hash].[ext]' },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff&name=generated/[hash].[ext]" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=generated/[hash].[ext]" }
        ]
    },

    externals: {
        'three': 'THREE'
    },

    worker: { output: { filename: 'generated/worker.js' } },
    plugins: [
        new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } })
    ].concat(production ? [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: { screw_ie8: true, warnings: false },
            mangle: { screw_ie8: true },
            output: { comments: false, screw_ie8: true }
        })
    ] : []),

    devServer: { contentBase: './' },
    devtool: undefined,
    cache: true,
    debug: false
};
