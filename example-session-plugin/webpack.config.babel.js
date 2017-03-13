import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = env => {
    const DEV_BABEL_PLUGINS = env.dev
        ? ['react-hot-loader/babel', ['transform-object-rest-spread', { useBuiltIns: true }]]
        : [];

    const DEV_WEBPACK_ENTRIES = env.dev
        ? ['react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:8080', 'webpack/hot/only-dev-server']
        : [];

    const DEV_WEBPACK_PLUGINS = env.dev
        ? [new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()]
        : [];

    const PROD_BABEL_PLUGINS = env.prod
        ? [['transform-runtime', { helpers: false, polyfill: false, regenerator: true }]]
        : [];

    const PROD_WEBPACK_ALIASES = env.prod ? { react: 'react-lite', 'react-dom': 'react-lite' } : {};

    const PROD_WEBPACK_PLUGINS = env.prod
        ? [
              new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
              new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
              new webpack.optimize.UglifyJsPlugin({
                  compress: {
                      warnings: false,
                      screw_ie8: true,
                      drop_console: true,
                      drop_debugger: true,
                      dead_code: true,
                      global_defs: { __REACT_HOT_LOADER__: undefined }
                  },
                  mangle: { screw_ie8: true },
                  output: { comments: false, screw_ie8: true }
              })
          ]
        : [];

    return {
        entry: {
            bundle: ['babel-polyfill', ...DEV_WEBPACK_ENTRIES, __dirname + '/index.js']
        },
        output: {
            filename: 'build/[name].js',
            path: __dirname
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        cacheDirectory: true,
                        presets: [['es2015', { modules: false, loose: true }], 'stage-0', 'react'],
                        plugins: [
                            ...DEV_BABEL_PLUGINS,
                            ...PROD_BABEL_PLUGINS,
                            'jsx-control-statements',
                            'transform-export-extensions',
                            'transform-decorators-legacy',
                            'transform-class-properties',
                            ['transform-es2015-classes', { loose: true }],
                            ['import', { libraryName: 'antd', style: 'css' }]
                        ]
                    }
                },
                {
                    test: /\.(gif|png|jpe?g|svg)$/,
                    use: ['file-loader?hash=sha512&digest=hex&name=build/images/[hash].[ext]', 'image-webpack-loader']
                },
                { test: /\.glsl$/, loader: 'webpack-glsl-loader' },
                { test: /\.css$/, loader: 'style-loader!css-loader' }
            ]
        },
        resolve: {
            modules: [path.resolve('./'), 'src', 'node_modules'],
            extensions: ['.js', '.jsx'],
            alias: {
                three$: path.resolve(__dirname, 'three_hooks/index.js'),
                ...PROD_WEBPACK_ALIASES
            }
        },
        plugins: [
            new ExtractTextPlugin('build/style.css'),
            new webpack.LoaderOptionsPlugin({
                options: {
                    worker: { output: { filename: 'build/worker.js' } }
                }
            }),
            ...DEV_WEBPACK_PLUGINS,
            ...PROD_WEBPACK_PLUGINS
        ],
        devServer: { hot: env.dev, contentBase: __dirname, stats: 'errors-only' },
        performance: { hints: false }
    };
};
