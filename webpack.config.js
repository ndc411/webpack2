/**
 * Created by Administrator on 2016/11/14.
 */
var path = require('path');
var webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    //用于提取多个入口文件的公共脚本部分，然后生成一个 common.js 来方便多页面之间进行复用
    commonsPlugin = new webpack.optimize.CommonsChunkPlugin('commons.js');
module.exports = {
    entry: {
        index: './index.js'
    },
    output: {
        path: './bundle',
        filename: '[name].js'
    },
    devServer: {
        historyApiFallback: true,
        contentBase: "./",
        quiet: false, //控制台中不输出打包的信息
        noInfo: false,
        hot: true,
        inline: true,
        lazy: false,
        progress: true, //显示打包的进度
        watchOptions: {
            aggregateTimeout: 300
        },
        port: '8088'
    },
    module: {
        loaders: [
            { test: /\.css$/,loader:"style!css" },
            { test: /\.(png|jpg$)/,loader: "url-loader?limit=308192" },
            { test: /\.coffee$/, loader: "coffee-loader" }
        ]
    },
    plugins: [commonsPlugin, new ExtractTextPlugin("[name].css"),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
};