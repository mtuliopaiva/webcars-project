import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { NavLink } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

interface MainLayoutProps {
    children: React.ReactNode;
  }
  
  const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const menuItems = [
        { key: '1', label: 'Home', path: '/' },
        { key: '2', label: 'About', path: '/about' },
        { key: '3', label: 'Login', path: '/login' },
        { key: '4', label: 'Register', path: '/register' },
        { key: '5', label: 'Forgot Password', path: '/forgotpassword' },
      ];
  
    return (
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <div className="demo-logo" />
          <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ flex: 1, minWidth: 0 }}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key}>
              <NavLink to={`${item.path}`}>
                {item.label}
              </NavLink>
            </Menu.Item>
          ))}
        </Menu>
        </Header>
        <Content style={{ padding: '0 48px', minHeight: 'calc(82vh - 0px)' }}>
          <div
            style={{
              background: colorBgContainer,
              padding: 24,
              borderRadius: borderRadiusLG,
              minHeight: '70vh'
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    );
  };
  
  export default MainLayout;