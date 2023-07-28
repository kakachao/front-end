import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import styles from './index.module.scss'
import initLoginBg from './initLoginBg';
import { login } from '@/store/actions/user'
import { User } from '@/interface';
import { AnyAction, Dispatch, bindActionCreators } from 'redux';

//这里使用的是connect

const Login = (props: PropsFromRedux) => {
  console.log(props)
  const [loginForm, setLoginForm] = useState({ username: 'admin', password: 'admin' });
  const navigate = useNavigate()
  useEffect(() => {
    initLoginBg()
  }, [])
  const onFinish = (values: User) => {
    // console.log('Received values of form: ', values);
    setLoginForm({
      ...loginForm,
      username: values.username,
      password: values.password
    })
    props.login({
      username: values.username,
      password: values.password
    })
    navigate('/demo1')
  };
  return (
    <div>
      <canvas id='canvas' className={styles.loginPage}>
      </canvas>
      <div className={styles.loginForm}>
        <div className={styles.title}>咔咔超·通用后台系统</div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入账户！' }]}
            initialValue="admin"
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="账户"
              value={loginForm.username}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
            initialValue="admin"
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
              value={loginForm.password}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )

}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators({ login }, dispatch);
}
//无法触发dispatch
// const mapDispatchToProps = () => ({
//   login
// })
const connector = connect(null, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(Login)