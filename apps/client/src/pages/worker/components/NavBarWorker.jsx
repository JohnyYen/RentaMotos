import {
  CarOutlined,
  DollarOutlined,
  FileDoneOutlined,
  FlagOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Flex, Drawer } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../../App.css";
import "boxicons";
import MenuWorker from "./MenuWorker";
//import axios from 'axios';

const NavBarWorker = () => {
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
        <MenuWorker />
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
            <MenuWorker isInline />
          </Drawer>
        </>
      )}
    </>
  );
};

export default NavBarWorker;
