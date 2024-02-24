import React from "react";
import { Col, Divider, Row, Avatar, Typography, Form, Input, Button } from "antd";
import MainLayout from "../../components/layouts/MainLayout";
import { Store } from "antd/es/form/interface";
import useAuthentication from "../../hooks/useAuthentication";

const Profile: React.FC = () => {
  const onFinish = (values: Store) => {
    console.log("Received values:", values);
  };

  const { user } = useAuthentication();


  return (
    <MainLayout>
      <Divider orientation="left">Profile</Divider>
<Row gutter={{ xs: 8, sm: 16, md: 20, lg: 32 }}>
  <Col className="gutter-row" span={5}>
    <Avatar
      style={{
        backgroundColor: "#1890ff",
        borderRadius: "50%", 
        width: "250px",
        height: "250px",
      }}
    >
      <Typography style={{fontSize:'86px', color:'#fff'}}>T</Typography>
    </Avatar>
  </Col>
  <Col className="gutter-row" span={10}>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Nome"
        name="nome"
        rules={[{ required: true, message: "Por favor, insira seu nome!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Senha"
        name="senha"
        rules={[{ required: true, message: "Por favor, insira sua senha!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          { required: true, message: "Por favor, insira seu e-mail!" },
          { type: "email", message: "Por favor, insira um e-mail válido!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="default" htmlType="submit" style={{ width: "100%" }}>
          Salvar
        </Button>
      </Form.Item>
    </Form>
  </Col>
  <Col className="gutter-row" span={9}></Col>
</Row>

    </MainLayout>
  );
};

export default Profile;
