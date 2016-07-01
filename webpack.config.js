var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var publicPath = 'http://localhost:8000/';

module.exports = {
    entry: [
        'webpack-dev-server/client?' + publicPath,
        'webpack/hot/only-dev-server',
        './assets/index'
    ],
    devtool: 'eval-source-map',
    output: {
        filename: 'index.bundle.js',
        path: path.resolve('public'),
        publicPath: publicPath
    },
    module: {
        loaders: [{
            test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            loader: "file?name=fonts/[name].[ext]"
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=8192&context=assets&name=[path][name].[ext]'
        }, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'resolve-url', 'sass?sourceMap']
        }, {
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            include: path.resolve('assets')
        }]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
          template: './index.ejs'
      }),
      new OpenBrowserPlugin({ url: publicPath })
    ]
};
