/*
 * @Author: CaoPengpeng
 * @since: 2020-09-22 16:21:39
 * @LastAuthor: Do not edit
 * @lastTime: 2020-09-23 10:56:16
 * @FilePath: /cil-tools/webpack/webpack.base.config.js
 * @message: 
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'js/[name].[hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                exclude: /node_modules/,
                // include: [APP_PATH],
                loader: 'eslint-loader',
                options: {
                    emitWarning: true, // 这个配置需要打开，才能在控制台输出warning信息
                    emitError: true, // 这个配置需要打开，才能在控制台输出error信息
                    fix: true // 是否自动修复，如果是，每次保存时会自动修复可以修复的部分
                }
            },
            {
                test: /\.(css|less)$/,
                // include: path.resolve(__dirname, './src'),// 这里会直接到 src 文件下找 less/css 文件进行编译，这里是项目优化的一个小技巧
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            //  您可以在此处指定publicPath
                            //  默认情况下，它在webpackOptions.output中使用publicPath
                            publicPath: './'
                        },
                    }, 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // limit: 500
                        }
                    }
                ]
            },
            // {
            //     test: /\.(png|jpg|gif)$/,
            //     use: ['file-loader'],
            // },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                  loader: 'babel-loader'
                },
            },
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
        ]
    },
    resolve: {
        //引入路径是不用写对应的后缀名
        extensions: ['.js','.jsx', '.tsx', '.less', '.css'],
        alias: {
          //用@直接指引到src目录下
          '@': path.resolve(__dirname, './src'),
        },
    },
    performance: {
        hints: "warning", // 枚举
        maxAssetSize: 30000000, // 整数类型（以字节为单位）
        maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
        assetFilter: function(assetFilename) {
            // 提供资源文件名的断言函数
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: '自定义脚手架',
            template: './index.html',
            filename: "index.html",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true
            }
        }),
        // 每次部署时清空 dist 目录
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            //  选项类似于webpackOptions.output中的相同选项
            //  所有选项都是可选的
            filename: 'css/built.[contenthash:10].css',
            // chunkFilename: "[id].css",
            ignoreOrder: false //  启用以删除有关顺序冲突的警告
        }),
    ]
}