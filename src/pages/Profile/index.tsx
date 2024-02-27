import React, { useState } from "react";
import {
  Col,
  Divider,
  Row,
  Avatar,
  Typography,
  Form,
  Input,
  Button,
} from "antd";
import MainLayout from "../../components/layouts/MainLayout";
import { Store } from "antd/es/form/interface";
import useAuthentication from "../../hooks/useAuthentication";
import profileService from "../../services/profileService";

const Profile: React.FC = () => {
  const [formValues, setFormValues] = useState<Store | null>(null);

  const onFinish = (values: Store) => {
    console.log("Received values:", values);

    const newProfileData = {
      name: values.name,
    };

    setFormValues(newProfileData);
  };

  const { user } = useAuthentication();
  const handleUpdateProfile = async (newProfileData: any) => {
    try {
      const userId = user?.uid;
      const displayName = newProfileData?.name;
      const photoURL = null;

      console.log("userId:", userId);
      console.log("displayName:", displayName);

      if (userId && displayName) {
        const result = await profileService.updateProfile(displayName, "");
        console.log("Perfil atualizado com sucesso.");
      } else {
        throw new Error("Usuário não autenticado ou nome não fornecido.");
      }
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
    }
  };

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
            <Typography style={{ fontSize: "86px", color: "#fff" }}>
              T
            </Typography>
          </Avatar>
        </Col>
        <Col className="gutter-row" span={10}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={(values) => {
              console.log("Received values:", values);
              const newProfileData = {
                name: values.name,
              };
              handleUpdateProfile(newProfileData);
            }}
          >
            <Form.Item
              label="Nome"
              name="name"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="senha"
              rules={[
                { required: true, message: "Por favor, insira sua senha!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                { required: true, message: "Por favor, insira seu e-mail!" },
                {
                  type: "email",
                  message: "Por favor, insira um e-mail válido!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="default"
                htmlType="submit"
                style={{ width: "100%" }}
              >
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
