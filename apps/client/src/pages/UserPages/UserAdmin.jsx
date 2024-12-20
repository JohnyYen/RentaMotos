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
      <Header className="header">
        <CustomHeader />
      </Header>
      <Layout style={{height: "auto"}}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          className="sider"
        >
          <SideBarAdmin />
        </Sider>
        <Content>
          <AppRouter />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserAdmin;
