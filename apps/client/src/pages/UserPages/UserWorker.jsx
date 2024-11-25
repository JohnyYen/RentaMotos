import { useState } from "react";
import { Layout } from "antd";
import SideBarWorker from "../../components/SideBarWorker";
import CustomHeader from "../../components/CustomHeader";
import AppRouter from "../../components/AppRoutes.worker";
const { Sider, Header, Content } = Layout;

const UserWorker = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="App">
      <Header className="header">
        <CustomHeader />
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          className="sider"
        >
          <SideBarWorker />
        </Sider>
        <Content>
          <AppRouter />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserWorker;
