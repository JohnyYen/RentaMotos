import React from "react";
import { useState } from "react";
import { Card, Divider, Flex, FloatButton, Image, Layout } from "antd";
import SideBarClient from "../../components/SideBarClient";
import CustomHeader from "../../components/CustomHeader";
import AppRouter from "../../components/AppRoutes.home";
import { UserOutlined } from "@ant-design/icons";
import Profile from '../../components/Profile';
import SideBarHome from '../../components/SideBarHome';
import WelcomeText from '../../components/WelcomeText';
import SliderTopVentas from "../../components/SliderTopVentas";

const { Sider, Header, Content,Footer } = Layout;


const HomePage = () => {
const [collapsed, setCollapsed] = useState(true);
  return (
    <Layout className="App" >
      <Sider
      style={{}}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="sider"
      >
        <SideBarHome/>
      </Sider>
      <Layout>
        
        <Content className="content"  >
  
          <AppRouter/>
        </Content>
        <Footer className="footer">
        <Flex align="center" justify= "end" style={{height:40, textAlign: "center"}}>
                  <div>telefono: </div>
                  <div>Email:</div>
    </Flex>
        </Footer >
        
          
      
      </Layout>
    </Layout>
  );
};

export default HomePage;