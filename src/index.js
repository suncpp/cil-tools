import React, { Component } from 'react';
import ReactDom from 'react-dom';

class App extends Component {
    render() {
        return(
            <div>
                halo
            </div>
        )
    }
}

// 需要在 index.html 中增加一个 div标签 id 设置为 'root'
ReactDom.render(<App />, document.getElementById('root'));