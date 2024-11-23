import { Image, Typography, Drawer, Flex, Button, Select } from "antd";
import { LoginOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SideBarAdmin from "./SideBarAdmin";
import { useState } from "react";
import { PiSelectionBackground } from "react-icons/pi";

const CustomHeader = () => {
  const [t, i18n] = useTranslation("global");
  const [openMenu, setOpenMenu] = useState();

  const language = (value, option) => {
    switch (value) {
      case "es":
        i18n.changeLanguage("es");
        break;
      case "en":
        i18n.changeLanguage("en");
        break;
    }
  };

  return (
    <Flex style={{ width: "100%" }} align="center" justify="space-between">
      <Flex align="center" justify="center">
        <box-icon
          name="cycling"
          size="md"
          color="white"
          style={{ marginRight: "1.5rem" }}
        ></box-icon>
        <Typography.Title style={{ color: "white" }} level={2}>
          {t("header.motorcycleRent")}
        </Typography.Title>
      </Flex>
      <Flex align="center" justify="center">
        <Button
          onClick={() => {
            localStorage.removeItem("userData");
            localStorage.removeItem("clientData");
          }}
          className="header-button"
          type="link"
          iconPosition="end"
          icon={<LoginOutlined style={{ fontSize: "1.5rem" }} />}
        >
          <Link to="/">Log Out</Link>
        </Button>
        <Select
          className="popup-language"
          variant="Filled"
          size="small"
          defaultValue="es"
          onChange={language}
          options={[
            {
              value: "es",
              label: "es",
            },
            {
              value: "en",
              label: "en",
            },
          ]}
        />
        <MenuOutlined className="toggle-menu" style={{fontSize: "1.5rem", color: "white", }} onClick={() => setOpenMenu(true)} />
        <Drawer open={openMenu} onClose={() => setOpenMenu(false)} closable={false} style={{backgroundColor: "#001529"}}>
          <SideBarAdmin isInline/>
        </Drawer>
    {/* <Flex align="center" justify= "space-between" style={{height:40}}>
      <Typography.Title style={{color: "white"}} level={2}>{t("header.motorcycleRent")}</Typography.Title>
      <Flex align="center" justify="center">
          <Button onClick={() => {localStorage.removeItem('userData'); localStorage.removeItem('clientData');}} className="header-button" type="link" iconPosition="end" icon={<LoginOutlined style={{fontSize: "1.2rem"}}/>}>
            <Link to='/login'>Log Out</Link></Button>
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
              ]}/> */}
      </Flex>
    </Flex>
  );
};

export default CustomHeader;
