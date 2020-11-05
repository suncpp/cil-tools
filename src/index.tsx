/*
 * @Author: CaoPengpeng
 * @since: 2020-09-22 16:21:39
 * @LastAuthor: Do not edit
 * @lastTime: 2020-10-16 14:05:11
 * @FilePath: /cil-tools/src/index.tsx
 * @message:
 */
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Login from '../view/Login'
import './index.css'
import 'reset-css/reset.css'
import {
  HashRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom';

class App extends Component {
  render() {
    return(
      <HashRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Login}></Route>
            {/* <Route path="/about" component={About}></Route>
             <Route path="/topics" component={Topics}></Route> */}
          </Switch>
        </div>
      </HashRouter>
    )
  }
}

// 需要在 index.html 中增加一个 div标签 id 设置为 'root'
ReactDom.render(<App />, document.getElementById('root'));
