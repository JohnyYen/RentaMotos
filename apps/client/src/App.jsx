import React from "react";
import { useState } from "react";
import "./App.css";
import SideBar from "./components/SideBar.jsx";
import CustomHeader from "./components/CustomHeader.jsx";
import MainContent from "./components/MainContent.jsx";
import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Sider, Header, Content } = Layout;


function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="App">
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} className="sider">
        <SideBar />
        {/* <Button type="primary" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)} className="sider-btn"></Button> */}
      </Sider>
      <Layout>
        <Header className="header">
          <CustomHeader />
        </Header>
        <Content className="content">
          <MainContent></MainContent>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
