import { useState } from "react";
import { Layout } from "antd";
import AppRouter from "./components/AppRoutes.admin";
import NavBarAdmin from "./components/NavBarAdmin";
const { Sider, Header, Content } = Layout;

const UserAdmin = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout className="App">
      <Header className="header">
        <NavBarAdmin />
      </Header>
      <Content className="content">
        <AppRouter />
      </Content>
    </Layout>
  );
};

export default UserAdmin;
