import { useState } from "react";
import { Layout } from "antd";
import SideBarAdmin from "../../components/SideBarAdmin";
import CustomHeader from "../../components/CustomHeader";
import AppRouter from "../../components/AppRoutes.admin";
const { Sider, Header, Content } = Layout;

const UserAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="App">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="sider">
        <SideBarAdmin />
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

export default UserAdmin;
