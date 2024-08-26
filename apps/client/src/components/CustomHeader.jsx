import { Image, Typography, Space, Flex, Button } from "antd";
import { LoginOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const CustomHeader = ({onPress}) => {
  return (
    <Flex align="center" justify="space-between">
      <Typography.Title style={{color: "white", marginBottom: ""}} level={2}>Renta Motos</Typography.Title>
      <Flex align="center" justify="center">
          <Button className="header-button" type="link" iconPosition="end" icon={<LoginOutlined style={{fontSize: "1.2rem"}}/>}>
            <Link to='/login'>Sign in</Link></Button>
      </Flex>
    </Flex>
  ); 
};  

export default CustomHeader;
