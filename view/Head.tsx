import React from 'react';
import { Form, Input, Button, Row, Col, } from 'antd';
import './Head.less';


class Head extends React.Component {
  constructor(prop: any) {
    super(prop);
    this.state = {
      Username: '',
      Password: ''
    }
  }

  onFinish = (values: any) => {
    console.log('Success:', values);
  };

  onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 4, color: '#fff' },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };
    const formStyle = {
      marginTop: '15%'
    }
    return (
      <div id="login" style={{width:`${window.innerWidth}px`,height:`${window.innerHeight}px`}}>
        <Row justify="center" align="middle">
          <Col span={16}>
            <Form
              {...layout}
              style={formStyle}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                {...layout.wrapperCol}
                label="用户名"
                name="username"
                rules={[{ required: true, message: '用户名必填!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                {...layout.wrapperCol}
                label="密码"
                name="password"
                rules={[{ required: true, message: '密码必填!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  登 录
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Head;