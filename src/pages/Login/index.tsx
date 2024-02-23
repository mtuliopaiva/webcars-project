import React from "react";
import MainLayout from "../../components/layouts/MainLayout";
import { Card, Space, Row, Col } from "antd";

import { Button, Checkbox, Form, Input } from "antd";
import useAuthentication, { EmailPasswordCredentials } from "../../hooks/useAuthentication";

const Login: React.FC = () => {
  const { loading, error, signInWithEmailPassword } = useAuthentication();

  const onFinish = async (values: EmailPasswordCredentials) => {
    await signInWithEmailPassword(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <MainLayout>
      <Row justify="center" style={{ minHeight: "100vh" }}>
        <Col>
          <Card
            title="Sign in to WebCars"
            style={{ width: 400 }}
            headStyle={{ backgroundColor: '#1890ff', color: 'white' }}
            className="shadow-lg"
          >
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not a valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
                  loading={loading}
                >
                  Submit
                </Button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Login;
