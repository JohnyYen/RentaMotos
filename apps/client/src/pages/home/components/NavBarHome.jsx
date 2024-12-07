import {
  CarOutlined,
  DollarOutlined,
  FileAddOutlined,
  FileDoneOutlined,
  FlagOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Flex, message, Button, Typography, Drawer } from "antd";
import { useTranslation } from "react-i18next";
import "../../../App.css";
import "boxicons";
import { IoDocumentOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuHome from "./MenuHome";

const NavBarHome = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");
  const [openMenu, setOpenMenu] = useState();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  const handleResize = () => {
    setIsDesktop(window.innerWidth >= 1024);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {contextHolder}
      <Flex align="center" justify="center">
        <box-icon
          onClick={() => {
            navigate(`/home`);
          }} //Pa virar a home
          name="home"
          size="2.5rem"
          color="white"
          style={{ cursor: "pointer" }}
        ></box-icon>
        <h2 className="header-title">Renta Motos</h2>
      </Flex>
      {isDesktop ? (
        <MenuHome messageApi={messageApi} />
      ) : (
        <>
          <MenuOutlined
            style={{ fontSize: "1.5rem", color: "white" }}
            onClick={() => setOpenMenu(true)}
          />
          <Drawer
            open={openMenu}
            onClose={() => setOpenMenu(false)}
            closable={false}
            style={{ backgroundColor: "#001529" }}
          >
            <MenuHome isInline messageApi={messageApi} />
          </Drawer>
        </>
      )}
    </>
  );
};

export default NavBarHome;
