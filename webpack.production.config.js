var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');

var productionConfig = [{
    entry: './assets/index',
    output: {
        filename: 'index.bundle.js',
        path: path.resolve('public')
    },
    module: {
        loaders: [{
            test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            loader: "file?name=fonts/[name].[ext]"
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=8192&context=assets&name=[path][name]_[hash:12].[ext]'
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style', 'css!postcss!resolve-url!sass?sourceMap')
        }, {
            test: /\.js$/,
            loader: 'babel',
            include: path.resolve('assets')
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['public'], {
            verbose: true
        }),
        new ExtractTextPlugin('index.css', {
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: './index.ejs'
        }),
        new CopyWebpackPlugin([
            { from: 'vendor'}
        ])
    ],
    postcss: [
        autoprefixer({
            browsers: ['Android >= 4.0', 'iOS >= 7.0', 'Chrome > 31', 'ff > 31', 'ie >= 10']
        })
    ]
}];

module.exports = productionConfig;
