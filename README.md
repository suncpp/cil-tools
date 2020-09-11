# cil-tools
webpack4构建vue/react的脚手架

## 基础搭建,初始化
```
	npm init -y
```
## webpack4安装
```
	npm i webpack webpack-cli -D
```
## 在 package.json 中增加运行命令
```
	"scripts": {
	    "test": "echo \"Error: no test specified\" && exit 1",
	    "dev": "webpack"
	  },
```
1. 在项目下创建 src 文件和 src/index.js 作为入口文件（webpack 默认配置中 entry 入口是 src/index.js）。
2. 执行 npm run dev 会看到在项目下会生成一个 dist 目录（打包成功）。
3. 到目前为止一个 webpack 项目已经搭建完成。

## 添加loader
### webpack默认支持js/json。可以添加loader来预处理文件。
1. style-loader/css-loader/file-loader
```
	npm i css-loader style-loader file-loader -D
```
2. babel 将es6+代码转换为es5的代码，来做浏览器兼容
```
	安装： npm i babel-loader @babel/core @babel/preset-env -D
	配置：
	module: {
	    rules: [
	        {
	            test: /\.js/,
	            loader: 'babel-loader'
	        }
	    ]
	},
	
	promise在ie下，解析失败
	安装：npm i @babel/polyfill -D
	index.js引入：import '@babel/polyfill';
	babel的详解：https://juejin.im/post/6844903810482044936#heading-4
```

## 添加plugins
```
	npm i html-webpack-plugin clean-webpack-plugin -D

```

## 添加热更新
```
	安装：
		npm i webpack-dev-server -D
	配置：
		const webpack = require('webpack')
		module.exports = {
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
		    plugins: [
		        // 启用模块热替换(HMR - Hot Module Replacement)
		        new webpack.HotModuleReplacementPlugin()
		    ]
		}
```
--------------------------------------------------
### 基础配置已经可以了。一下就是优化以及，根据自己的项目来了。
1. 搭建react项目
```
	npm i react react-dom -S
	npm i @babel/preset-react -D
```
2. 添加less
```
	安装：
		npm i less less-loader -D
	配置：
		{
		    test: /\.(css|less)$/,
		    use: ['style-loader', 'css-loader', 'less-loader']
		}
```
3. webpack样式优化
	* postcss-loader 帮你将现代 CSS 语法转换成大多数浏览器都能理解的东西
	* autoprefixer 会自动增加浏览器前缀。
	*  MiniCssExtractPlugin 来生成 css 样式，从 style标签中剥离。
```
	安装：npm i mini-css-extract-plugin postcss-loader autoprefixer -D
	配置：
	const MiniCssExtractPlugin = require('mini-css-extract-plugin');
	
	module: {
	    rules: [
	         {
	            test: /\.(css|less)$/,
	            use: [
	                {
	                    loader: MiniCssExtractPlugin.loader,
						// 这里会直接到 src 文件下找 less/css 文件进行编译，这里是项目优化的一个小技巧
						include: path.resolve(__dirname, './src'),
	                    options: {
	                        //  您可以在此处指定publicPath
	                        //  默认情况下，它在webpackOptions.output中使用publicPath
	                        publicPath: '../'
	                    },
	                }, 'css-loader', 'postcss-loader', 'less-loader']
	        },
	    ]
	}
	
	plugins: [
	    new MiniCssExtractPlugin({
	        //  选项类似于webpackOptions.output中的相同选项
	        //  所有选项都是可选的
	        filename: "[name].css",
	        chunkFilename: "[id].css",
	        ignoreOrder ：false ，//  启用以删除有关顺序冲突的警告  
	    })
	]
```
4. 根目录下新建 postcss.config.js 来配置 postcss
```
	module.exports = {
	    plugins: [
	        require('autoprefixer')({
	            overrideBrowserslist: ['last 2 versions', '>1%']
	        })
	    ]
	}
```

### Optimization
- webpack打包提取公共代码
```
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
	        cacheGroups: {
	            // [\\/] 解决系统之间的兼容
	            react: {
	                test: /[\\/]react|react-dom[\\/]/,
	                name: 'react'
	            },
	            lodash: {
	                test: /[\\/]lodash[\\/]/,
	                name: 'lodash'
	            }
	        }
	    }
	},
```

### resolve
```
	resolve: {
		//引入路径是不用写对应的后缀名
		extensions: ['.js','.jsx', '.less', '.css'],
		alias: {
		  //用@直接指引到src目录下
		  '@': path.resolve(__dirname, './src'),
		},
	}
```
## 环境区分
```
// 合并 webpack 配置对象
npm i webpack-merge -D

// 在执行命令的时候传参
npm i cross-env -D
```