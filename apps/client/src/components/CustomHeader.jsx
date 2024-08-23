import { Image, Typography, Space, Flex, Button } from "antd";
import { LoginOutlined, UserOutlined } from "@ant-design/icons";

const CustomHeader = ({onPress}) => {
  return (
    <Flex align="center" justify="space-between">
      <Typography.Title style={{color: "white", marginBottom: ""}} level={2}>Renta Motos</Typography.Title>
      <Flex align="center" justify="center">
          <Button className="header-button" type="primary" iconPosition="end" icon={<LoginOutlined style={{fontSize: "1.2rem"}}/>}>Sign in</Button>
      </Flex>
    </Flex>
  ); 
};  

export default CustomHeader;
