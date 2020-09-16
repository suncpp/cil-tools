import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './index.css'
import { Route, NavLink, BrowserRouter as Router, Switch } from 'react-router-dom'
import App from './app';
import Users from './user';
import Contact from './Contact';
import NotFound from './NotFound';

class App1 extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <NavLink exact activeClassName="active" to="/">
            Home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/users">
            Users
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/contact">
            Contact
              </NavLink>
            </li>
          </ul>
          {/* 当你在没有添加，link标签的时候，在url中输入对应的路由，会404. */}
          <Switch>
            <Route exact path='/' component={App}></Route>
            <Route path='/users' component={Users}></Route>
            <Route path='/Contact' component={Contact}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

// 需要在 index.html 中增加一个 div标签 id 设置为 'root'
ReactDom.render(<App1 />, document.getElementById('root'));