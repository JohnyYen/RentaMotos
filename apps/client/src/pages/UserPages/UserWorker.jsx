import { useState } from "react";
import { Layout } from "antd";
import SideBarWorker from "../../components/SideBarWorker"
import CustomHeader from "../../components/CustomHeader";
import AppRouter from "../../components/AppRoutes.worker";
const { Sider, Header, Content } = Layout;

const UserWorker = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="App">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="sider">
        <SideBarWorker />
      </Sider>
      <Layout>
        <Header className="header">
          <CustomHeader />
        </Header>
        <Content className="content">
          <AppRouter/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserWorker;
