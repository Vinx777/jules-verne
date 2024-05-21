import React from "react";
import instance from "@/utils/axios";
import styles from "./RegisterForm.module.css";

import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";

export const RegisterForm: React.FC = React.memo(() => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await instance.post("/auth/register", {
        email: values.username,
        password: values.password,
        confirmPassword: values.confirm,
      });
      alert("registration success");
      navigate("/signIn");
    } catch (error) {
      alert("registration failed");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={styles["register-form"]}
    >
      <Form.Item
        label="user"
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

      <Form.Item
        label="password"
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
      <Form.Item
        label="Confirm Password"
        name="confirm"
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "Please enter your password again!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("The passwords entered twice do not match!"));
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          register
        </Button>
      </Form.Item>
    </Form>
  );
});
