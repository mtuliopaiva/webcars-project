import React from "react";
import { Card, Row, Col, Form, Input, Button, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import MainLayout from "../../components/layouts/MainLayout";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const { email, password } = values;
    const auth = getAuth();

    try {
      // Cria o usuário com e-mail e senha
      await createUserWithEmailAndPassword(auth, email, password);

      // Navega para a página de login após o registro bem-sucedido
      navigate("/login");
    } catch (error: any) {
      console.error("Erro ao criar usuário:", error.message);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <MainLayout>
      <Row justify="center" style={{ minHeight: "100vh" }}>
        <Col>
          <Card
            title="Sign up for WebCars"
            style={{ width: 400 }}
            headStyle={{ backgroundColor: "#1890ff", color: "white" }}
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
                    message: "The input is not valid E-mail!",
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
                  style={{
                    backgroundColor: "#1890ff",
                    borderColor: "#1890ff",
                  }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Register;
