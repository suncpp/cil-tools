const webpack = require("webpack");
const { merge } = require('webpack-merge');
const webpackBase = require('./webpack.base.config');

// merge 用法和 Object.assign 类似
module.exports = merge(webpackBase, {
    mode: 'development',
    plugins: [
        // 启用模块热替换(HMR - Hot Module Replacement)
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'cheap-module-eval-source-map',
    // // 启动项目
    devServer: {
        contentBase: './dist',
        open: true,
        port: 8081,
        hot: true,
        hotOnly: true
    },
});