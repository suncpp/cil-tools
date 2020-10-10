/*
 * @Author: CaoPengpeng
 * @since: 2020-09-22 16:21:39
 * @LastAuthor: Do not edit
 * @lastTime: 2020-09-23 11:10:07
 * @FilePath: /cil-tools/src/index.tsx
 * @message: 
 */
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Head from '../view/Head'
import './index.css'
import 'reset-css/reset.css'

class App extends Component {
    render() {
        return(
            <div>
                <Head />
            </div>
        )
    }
}

// 需要在 index.html 中增加一个 div标签 id 设置为 'root'
ReactDom.render(<App />, document.getElementById('root'));