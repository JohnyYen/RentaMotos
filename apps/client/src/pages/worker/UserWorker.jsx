import { useState } from "react";
import { Layout } from "antd";
import SideBarWorker from "../worker/components/SideBarWorker";
import CustomHeader from "../../components/CustomHeader";
import AppRouter from "../worker/components/AppRoutes.worker";
const { Sider, Header, Content } = Layout;

const UserWorker = () => {
  const [collapsed, setCollapsed] = useState(true);

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
        <Content className="content">
          <AppRouter />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserWorker;
