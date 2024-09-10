import React from "react";
import { useState } from "react";
import { FloatButton, Layout } from "antd";
import SideBarClient from "../../components/SideBarClient";
import CustomHeader from "../../components/CustomHeader";
import AppRouter from "../../components/AppRoutes.client";
import { UserOutlined } from "@ant-design/icons";
import Profile from '../../components/Profile'

const { Sider, Header, Content } = Layout;

const UserClient = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);

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
          <AppRouter/>
        </Content>
      </Layout>
      <FloatButton  style={{width:60, height:50}} icon={<UserOutlined/>} onClick={() => setVisible(true)}/>
      <Profile isOpen={visible} setOpen={() => setVisible(!visible)}/>
    </Layout>
  );
};

export default UserClient;
