const { resolve } = require('path');
const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩 Css 文件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
    entry: './src/index.js',
    output: {
        filename: './js/built_[hash:10].js',
        path: resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(css|less)$/,
                include: resolve(__dirname, './src'),// 这里会直接到 src 文件下找 less/css 文件进行编译，这里是项目优化的一个小技巧
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            //  您可以在此处指定publicPath
                            //  默认情况下，它在webpackOptions.output中使用publicPath
                            publicPath: '../'
                        },
                    }, 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.js$/,
                use: [
                    { loader: 'babel-loader'}
                ]
            }
        ]
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
        // 启用模块热替换(HMR - Hot Module Replacement)
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            //  选项类似于webpackOptions.output中的相同选项
            //  所有选项都是可选的
            filename: "./css/built_[hash:10].css",
            // chunkFilename: "[id].css",
            ignoreOrder: false //  启用以删除有关顺序冲突的警告
        }),
        // 压缩css文件
        new OptimizeCssAssetsWebpackPlugin()
    ],
    mode: 'production',
    // 是否开启 source-map
    devtool: 'cheap-module-eval-source-map',
    // devServer和entry是平级的
    devServer: {
        // 指向打包后的文件地址
        contentBase: './dist',
        // 是否自动打开一个新窗口
        open: true,
        // 端口号
        port: 8081,
        // 是否开启热更新
        hot: true,
        // 启用热模块替换，而不会在构建失败时将页面刷新作为后备。
        hotOnly: true
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
    },
    resolve: {
        // 规定在那里寻找第三方模块
        modules: [resolve(__dirname, './node_modules')],
        // 别名 我们可以通过别名的方式快速定位到引用包的/方法的路劲，优化打包和运行本地服务
        alias: {
            react: resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
            'react-dom': resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js'),
            '@': resolve(__dirname, './src')
        },
        // 自动补齐后缀名，这个列表会让webpack一级一级寻找，尽量少配置
        // extensions: ['.js', '.jsx']
    },
    resolve: {
        //引入路径是不用写对应的后缀名
        extensions: ['.js','.jsx', '.less', '.css'],
        alias: {
          //用@直接指引到src目录下
          '@': path.resolve(__dirname, './src'),
        },
      },
}