import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon } from 'antd';
import Login from 'ant-design-pro/lib/Login';
import styles from './login.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect((obj) => {
  return {
    login: obj.login,
    submitting: obj.loading.effects['login/login'],
  };
})
export default class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  }

  onTabChange = (type) => {
    this.setState({ type });
  }

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      this.props.dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  }

  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  }

  renderMessage = (content) => {
    return (
      <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    );
  }

  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
        >
          <Tab key="account" tab="账户密码登录">
            {
              login.status !== '0' &&
              login.type === 'account' &&
              !login.submitting &&
              this.renderMessage('账户或密码错误')
            }
            <UserName name="username" placeholder="请输入用户名（test）" rules={[{ required: true, message: '请输入用户名!' }]}/>
            <Password name="password" placeholder="请输入密码（123456）" rules={[{ required: true, message: '请输入密码!' }]}/>
          </Tab>
          <Tab key="mobile" tab="手机号登录">
            {
              login.status === 'error' &&
              login.type === 'mobile' &&
              !login.submitting &&
              this.renderMessage('验证码错误')
            }
            <Mobile name="mobile" />
            <Captcha name="captcha" />
          </Tab> 
          <Submit loading={submitting}>登录</Submit> 
        </Login>
      </div>
    );
  }
}
