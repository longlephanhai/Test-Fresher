import { Button, Divider, Form, Input, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogin } from '../../services/api';
import { useDispatch } from 'react-redux';
import { doLoginAction } from '../../redux/account/accountSlice';
const LoginPage = () => {
  const [isSubmit, setIsSubmit] = useState(false)
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setIsSubmit(true)
    const response = await handleLogin(values)
    setIsSubmit(false)
    if (response?.data) {
      localStorage.setItem('access_token', response.data.access_token)
      dispatch(doLoginAction(response.data.user))
      message.success('Login successful!')
      navigate('/')
    } else {
      message.error(response?.message)
    }
  };
  return (
    <>
      <div className='register-page' style={{ padding: '50px' }}>
        <h3>Login</h3>
        <Divider />
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          style={{ maxWidth: 600, margin: '0 auto' }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            labelCol={{ span: 24 }}
            label="Email:"
            name="username"
            rules={[{ type: 'email', required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }}
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmit}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default LoginPage;