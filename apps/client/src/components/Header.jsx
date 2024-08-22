import { Image, Typography, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Header = () => {
  return (
    <div className="nav-container">
      <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjs3Ynou5ClBhLVlkXKLRrEFAZkL6JDUm61U6O6rJ0FQ_mwOABgVMzWZ73wtCjCoIMh4w&usqp=CAU"
      width={60}></Image>
      <Typography.Title style={{color: 'white'}}>Renta Motos</Typography.Title>
      <Space>
        <UserOutlined style={{fontSize: '1.5rem'}} />
      </Space>
    </div>
  );
};  

export default Header;
