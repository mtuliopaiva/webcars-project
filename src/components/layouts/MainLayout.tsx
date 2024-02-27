import React from "react";
import {
  Avatar,
  Breadcrumb,
  Button,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Space,
  theme,
} from "antd";
import { NavLink } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";
import { UserOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { user, loading,error, signOut } = useAuthentication();


  let menuItems = [];

  if (user) {
    menuItems = [
      { key: "1", label: "Home", path: "/" },
      // Outros itens de menu para usuários autenticados, se necessário
    ];
  } else {
    menuItems = [
      { key: "1", label: "Home", path: "/" },
      { key: "2", label: "About", path: "/about" },
      { key: "3", label: "Login", path: "/login" },
      { key: "4", label: "Register", path: "/register" },
      { key: "5", label: "Forgot Password", path: "/forgotpassword" },
      // Outros itens de menu para usuários não autenticados, se necessário
    ];
  }

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a rel="noopener noreferrer" href="/profile">
          Profile
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          rel="noopener noreferrer"
          onClick={(signOut)}
        >
          Logout
        </a>
      ),
    },
  ];

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ flex: 1, minWidth: 0 }}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key}>
              <NavLink to={`${item.path}`}>{item.label}</NavLink>
            </Menu.Item>
          ))}
        </Menu>
        {user && (
          <Space direction="horizontal" align="center" wrap size={16}>
            <Avatar
              style={{ backgroundColor: "#1677FF" }}
              icon={<UserOutlined />}
            />
            <Dropdown menu={{ items }} placement="bottom" arrow>
              <span style={{ color: "#fff", cursor:'pointer'}}>{user.displayName}</span>
            </Dropdown>
          </Space>
        )}
      </Header>
      <Content style={{ padding: "0 48px", minHeight: "calc(82vh - 0px)" }}>
        <div
          style={{
            background: colorBgContainer,
            padding: 24,
            borderRadius: borderRadiusLG,
            minHeight: "70vh",
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Webcars ©{new Date().getFullYear()} Webcars your best platform to buy
        cars.
      </Footer>
    </Layout>
  );
};

export default MainLayout;
