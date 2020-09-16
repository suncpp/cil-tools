
import React from 'react';
import { Button } from 'antd';

class Contact extends React.Component {
  render() {
    return (
      <div>
        <h1>Contact</h1>
        <Button type="primary" onClick={() => { this.props.history.push('/'); }}>编程式路由</Button>
      </div>
    )
  }
}

export default Contact;
