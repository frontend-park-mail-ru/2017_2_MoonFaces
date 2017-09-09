const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.html$/,loader: 'file?name=[name].[ext]' },
    ],
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?minimize=true', 'sass-loader']
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
    new ExtractTextPlugin('style.css'),
    // new HtmlWebpackPlugin({template: './index.html'})
  ]
};
                                 
