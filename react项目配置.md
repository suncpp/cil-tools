# react项目配置

## 引入typescript
```
npm install --save @types/react @types/react-dom // 获取TypeScript的声明文件,只有获取了声明文件，才能实现对这个库的类型检查。
npm install --save-dev typescript awesome-typescript-loader source-map-loader // 其它的没有声明文件的库,添加对应的loader
```
1. awesome-typescript-loader可以让Webpack使用TypeScript的标准配置文件tsconfig.json编译TypeScript代码。
2. source-map-loader使用TypeScript输出的sourcemap文件来告诉webpack何时生成自己的sourcemaps,源码映射，方便调试。

## 根目录下新建，tsconfig.json
```
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导入。这并不影响代码的输出，仅为了类型检查。
    "outDir": "./build/", // 重定向输出目录
    "sourceMap": true, // 生成相应的 .map文件
    "noImplicitAny": true, // 在表达式和声明上有隐含的 any类型时报错。（默认为false，个人建议也为false，可以兼容之前的js代码，这里改为true是为了我自己检测哪些类型需要处理）
    "module": "esnext", // 模块引入方式
    "target": "es6", // 指定ECMAScript目标版本
    "moduleResolution": "node", // 决定如何处理模块
    "lib": [
      "esnext",
      "dom"
    ], // 编译过程中需要引入的库文件的列表。
    "skipLibCheck": true, //忽略所有库中的声明文件（ *.d.ts）的类型检查。
    "jsx": "react" // 在 .tsx文件里支持JSX
  },
  "include": [
    "./src/**/*", // 这个表示处理根目录的src目录下所有的.ts和.tsx文件，并不是所有文件
  ]
}
```
## 配置webpack
```
{
	test: /\.jsx?$/,
	exclude: /(node_modules)/,
	use: {
	  loader: 'babel-loader',
	  options: {
		presets: ['@babel/preset-react']
	  },
	},
},
{ test: /\.tsx?$/, loader: "awesome-typescript-loader" }
```
## eslint配置
```
$ npm i -D eslint babel-eslint eslint-loader eslint-plugin-jsx-control-statements
$ npm i -D eslint-plugin-react @typescript-eslint/parser @typescript-eslint/eslint-plugin 
```
## 新建.eslintrc.js
```
module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    // "jquery": true
    "jest": true,
    "jsx-control-statements/jsx-control-statements": true // 能够在jsx中使用if，需要配合另外的babel插件使用
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "sourceType": 'module',
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },
  "globals": {
    // "wx": "readonly",
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-control-statements/recommended", // 需要另外配合babel插件使用
  ],
  "settings": {
    "react": {
      "version": "detect" // 自动读取已安装的react版本
    }
  },
  "plugins": ["@typescript-eslint", "react", "jsx-control-statements"],
  "rules": {
    "no-extra-semi": 0, // 禁止不必要的分号
    "quotes": ['error', 'single'], // 强制使用单引号
    "no-unused-vars": 0 // 不允许未定义的变量
    // ...你自己的配置
  }
};
```
1. 配置webpack
```
{
  enforce: 'pre',
  test: /\.tsx?$/,
  exclude: /node_modules/,
  loader: 'eslint-loader',
  options: {
	emitWarning: true, // 这个配置需要打开，才能在控制台输出warning信息
	emitError: true, // 这个配置需要打开，才能在控制台输出error信息
	fix: true // 是否自动修复，如果是，每次保存时会自动修复可以修复的部分
  }
}
```