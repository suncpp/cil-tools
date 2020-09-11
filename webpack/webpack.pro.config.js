const { resolve } = require('path');
const webpack = require("webpack");
const { merge } = require('webpack-merge');
const webpackBase = require('./webpack.base.config');
// 压缩 Css 文件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// 这里通过 cross-env 传了一个 NODE_ENV 变量 可以通过 process.env.NODE_ENV 获取变量的值
module.exports = merge(webpackBase,{
    mode: 'production',
    plugins: [
        // 压缩css文件
        new OptimizeCssAssetsWebpackPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                // 去掉注释
                preset: ["default", { discardComments: { removeAll: true } }]
            }
        })
    ],
    optimization: {
        // js 开启 tree shanking
        usedExports: true,
	    splitChunks: {
            chunks: "all", // 代码分隔 公共代码分离出来
            minSize: 30000,  //表示在压缩前的最小模块大小,默认值是30kb
            minChunks: 1,  // 表示被引用次数，默认为1；
            maxAsyncRequests: 5,  //所有异步请求不得超过5个
            maxInitialRequests: 3,  //初始话并行请求不得超过3个
            automaticNameDelimiter:'~',//名称分隔符，默认是~
            name: true,  //打包后的名称，默认是chunk的名字通过分隔符（默认是～）分隔
	    }
    }
});



