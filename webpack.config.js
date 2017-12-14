const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const BabelPlugin = require('babel-webpack-plugin');

const extracktDefault = new ExtractTextPlugin('style.css');
const extracktDark = new ExtractTextPlugin('dark.css');

const config = {
    entry: './src/app.js',

    context: __dirname,

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },

    devtool: 'inline-source-map',

    module: {
        loaders: [
            {test: /\.html$/, loader: 'file?name=[name].[ext]'},
        ],
        rules: [
            {
                test: /style\.scss$/,
                use: extracktDefault.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            query: {
                                url: false,
                                importLoaders: 1,
                                minimize: true,
                            },
                        },
                        'sass-loader',
                    ]
                }),
            },
            {
                test: /dark\.scss$/,
                use: extracktDark.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            query: {
                                url: false,
                                importLoaders: 1,
                                minimize: true,
                            },
                        },
                        'sass-loader',
                    ]
                }),
            },
            {
                test: /\.html$/,
                use: [
                    'file-loader?limit=100000&name=./[name].[ext]',
                ]
            },
            {
                test: /\.(ttf|woff|svg|eot|woff2)$/,
                use: [
                    'file-loader?limit=100000&name=./fonts/[name].[ext]',
                ]
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    'file-loader?limit=100000&name=./images/[name].[ext]',
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: {
                                quality: 90,
                                optimize: true,
                                speed: 4
                            }
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        extracktDefault,
        extracktDark,
        new webpack.DefinePlugin({
            'BACKEND_URL': JSON.stringify('https://bacterio.tech/restapi')
        }),
    ],

    devServer: {
        contentBase: path.join(__dirname, './dist/'),
        compress: true,
        port: 3000,
        historyApiFallback: true
    }
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new BabelPlugin({
            test: /\.js$/,
            presets: ['env'],
            sourceMaps: false,
            compact: false
        })
    );
}

module.exports = config;
