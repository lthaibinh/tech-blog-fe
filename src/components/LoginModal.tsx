import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { axiosInstance } from "@/utils/axios";
import { axiosObservable } from "@/utils/axiosObservable";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export const LoginModal = () => {
  const [visible, setVisible] = useState(false);
  //const router = useRouter();

  const handleSubmit = async (values: any) => {
    // axiosObservable<any>({
    //   url: "/identity/auth/token",
    //   method: "post",
    //   data: {
    //     username: values.username,
    //     password: values.password,
    //   },
    // }).subscribe({
    //   next: (data) => {
    //     document.cookie = `token=${data.token}; path=/; HttpOnly`;
    //     message.success("Login successful!");
    //     setVisible(false); // Close modal after success
    //   },
    //   error: (err) => {
    //     console.log("Error:", err);
    //     message.error(err.message);
    //   },
    //   complete: () => console.log("Request complete"),
    // });
    const result = await signIn("credentials", {
      redirect: false,
      username: values.username,
      password: values.password,
    });

    if (result?.error) {
      alert("Login failed. Please check your credentials.");
    } else {
      //router.push("/dashboard");
    }
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
        open={visible}
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
                message: "Please input your username!",
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
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Log In
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
