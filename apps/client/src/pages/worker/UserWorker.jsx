import { useState } from "react";
import { Layout } from "antd";
import SideBarWorker from "./components/NavBarWorker";
import CustomHeader from "../../components/CustomHeader";
import AppRouter from "../worker/components/AppRoutes.worker";
import NavBarWorker from "./components/NavBarWorker";
const { Sider, Header, Content } = Layout;

const UserWorker = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout className="App">
      <Header className="header">
        <NavBarWorker />
      </Header>
      <Content className="content">
        <AppRouter />
      </Content>
    </Layout>
  );
};

export default UserWorker;
