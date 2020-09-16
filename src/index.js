import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Button } from 'antd';
import './index.css'


class App extends Component {
    render() {
        return(
            <div>
                halo
                <Button type="primary">按钮</Button>
            </div>
        )
    }
}

// 需要在 index.html 中增加一个 div标签 id 设置为 'root'
ReactDom.render(<App />, document.getElementById('root'));