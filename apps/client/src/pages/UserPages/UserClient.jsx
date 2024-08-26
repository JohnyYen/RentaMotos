import React from "react";
import { useState } from "react";
import { Layout } from "antd";
import SideBarClient from "../../components/SideBarClient";
import CustomHeader from "../../components/CustomHeader";
import MainContent from "../../components/MainContent";

const { Sider, Header, Content } = Layout;

const UserClient = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="App">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="sider"
      >
        <SideBarClient />
      </Sider>
      <Layout>
        <Header className="header">
          <CustomHeader />
        </Header>
        <Content className="content">
          <MainContent />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserClient;
