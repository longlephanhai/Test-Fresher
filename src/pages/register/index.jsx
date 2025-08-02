import { Button, Divider, Form, Input, message } from 'antd';
import { useState } from 'react';
import { handleRegister } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {

  const [isSubmit, setIsSubmit] = useState(false)
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setIsSubmit(true)
    const response = await handleRegister(values)
    setIsSubmit(false)
    if (response?.data) {
      message.success('Registration successful!')
      navigate('/login')
    } else {
      message.error(response?.message)
    }
  };
  return (
    <div className='register-page' style={{ padding: '50px' }}>
      <h3>Register</h3>
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
          label="Full Name:"
          name="fullName"
          rules={[{ required: true, message: 'Please input your full name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 24 }}
          label="Email:"
          name="email"
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

        <Form.Item
          labelCol={{ span: 24 }}
          label="Phone:"
          name="phone"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmit}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>

  )
}
export default RegisterPage;