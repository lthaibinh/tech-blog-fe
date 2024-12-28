import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export const LoginModal = () => {
  const [visible, setVisible] = useState(false);

  // Handle form submission
  const handleSubmit = (values: any) => {
    // Simulate an API call for login
    console.log('Form values: ', values);
    message.success('Login successful!');
    setVisible(false);  // Close modal after success
  };

  // Open the modal
  const showModal = () => {
    setVisible(true);
  };

  // Close the modal
  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      {/* Button to open modal */}
      <Button type="primary" onClick={showModal} icon={<UserOutlined />}>
        Login
      </Button>

      {/* Modal Component */}
      <Modal
        title="Login"
        visible={visible}
        onCancel={handleCancel}
        footer={null} // We'll provide our own footer
      >
        <Form
          name="login_form"
          onFinish={handleSubmit}
          initialValues={{
            remember: true,
          }}
        >
          {/* Username Input */}
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Password Input */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Log In
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

