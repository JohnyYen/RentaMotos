import { Image, Typography, Space, Flex, Button, Select } from "antd";
import { LoginOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; 

const CustomHeader = () => {
  const [t, i18n] = useTranslation("global");

  const language = (value, option) => {
    switch(value){
      case 'es':
        i18n.changeLanguage("es");
        break;
      case 'en':
        i18n.changeLanguage("en");
        break;
    }
  };

  return (
    <Flex align="center" justify="space-between">
      <Typography.Title style={{color: "white"}} level={2}>{t("header.motorcycleRent")}</Typography.Title>
      <Flex align="center" justify="center">
          <Button onClick={() => {localStorage.removeItem('userData'); localStorage.removeItem('clientData');}} className="header-button" type="link" iconPosition="end" icon={<LoginOutlined style={{fontSize: "1.2rem"}}/>}>
            <Link to='/'>Log Out</Link></Button>
            <Select className="popup-language"
            variant="Filled"
            size="small"
            defaultValue='es' 
            onChange={language}
            options={[
              {
                value: 'es',
                label: 'es',
              },
              {
                value: 'en',
                label: 'en',
              }
              ]}/>
      </Flex>
    </Flex>
  ); 
};  

export default CustomHeader;
