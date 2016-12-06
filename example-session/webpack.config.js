var path = require('path');

module.exports = {
    entry: path.join(__dirname, 'index.js'),

    output: {
        publicPath: '/',
        path: __dirname,
        filename: 'bundle.js'
    },

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                cacheDirectory: true,
                presets: ['es2015-loose', 'stage-0'],
                plugins: ['transform-es2015-spread', 'transform-runtime']
            }
        }]
    },

    worker: { output: { filename: 'generated/worker.js' } },
    devServer: { contentBase: __dirname },
    devtool: 'source-map',
    cache: true,
    debug: true
};
