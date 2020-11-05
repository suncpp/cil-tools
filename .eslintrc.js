/*
 * @Author: CaoPengpeng
 * @since: 2020-09-22 16:21:39
 * @LastAuthor: Do not edit
 * @lastTime: 2020-10-16 14:05:03
 * @文件相对于项目的路径: /cil-tools/.eslintrc.js
 * @message: 
 */
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
      "no-unused-vars": 0, // 不允许未定义的变量
      "indent": [1, 2,{"SwitchCase":1}],//缩进两个空格
      // ...你自己的配置
    }
  };