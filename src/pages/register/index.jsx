import { Button, Divider, Form, Input, message } from 'antd';
import axios from '../../utils/axios.customize';
import { useState } from 'react';
import { handleRegister } from '../../services/api';



const RegisterPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [isSubmit, setIsSubmit] = useState(false)

  const onFinish = async (values) => {
    setIsSubmit(true)
    const response = await handleRegister(values)
    setIsSubmit(false)
    if (response?.data) {
      messageApi.success('Registration successful!')
    } else {
      messageApi.error('Registration failed. Please try again.')
    }
  };
  return (
    <div className='register-page' style={{ padding: '50px' }}>
      {contextHolder}
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

        <Form.Item
        // wrapperCol={{ offset: 6, span: 16 }}
        >
          <Button type="primary" htmlType="submit" loading={isSubmit}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>

  )
}
export default RegisterPage;