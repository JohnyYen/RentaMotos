import React from "react";
import { useState } from "react";
import { Card, Divider, Flex, FloatButton, Image, Layout } from "antd";
import AppRouter from "./components/AppRoutes.home";
import NavBarHome from "./components/NavBarHome";

const { Sider, Header, Content, Footer } = Layout;

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Layout className="App">
      <Header className="header">
        <NavBarHome />
      </Header>
      <Content className="content">
        <AppRouter />
      </Content>
      <Footer className="footer">
        <Flex
          align="center"
          justify="end"
          style={{ height: 40, textAlign: "center" }}
        >
          <div>telefono: 53591352_______________ </div>
          <div> Email: rentamotos@gmail.com</div>
        </Flex>
      </Footer>
    </Layout>
  );
};

export default HomePage;