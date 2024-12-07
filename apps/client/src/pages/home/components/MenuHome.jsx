import {
  CarOutlined,
  DollarOutlined,
  FileDoneOutlined,
  FlagOutlined,
  LogoutOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { IoDocumentOutline } from "react-icons/io5";
import { PiHardHat } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const MenuHome = ({ isInline = false, messageApi }) => {
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");

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

  const handleMenuClick = (item) => {
    const jwt = sessionStorage.getItem("jwt");

    const actions = {
      logout: () => navigate("/loguin"),
      spanish: () => language("es"),
      english: () => language("en"),
      faq: () => navigate(`/home/${item.key}`),
      contratosCliente: () =>
        jwt ? navigate(`/home/${item.key}`) : showLoginWarning(),
      motosCliente: () =>
        jwt ? navigate(`/home/${item.key}`) : showLoginWarning(),
      perfil: () => (jwt ? navigate(`/home/${item.key}`) : showLoginWarning()),
    };

    // Ejecutar acción basada en la key
    if (actions[item.key]) {
      actions[item.key]();
    }
  };

  const showLoginWarning = () => {
    messageApi.warning({
      content: (
        <h3>
          {t("sideBar.loginWarning")}
          <h4>{t("sideBar.loginPrompt")}</h4>
        </h3>
      ),
      duration: 3,
    });
  };

  return (
    <>
      <Menu
        theme="dark"
        className={`navBar-menu ${isInline ? "inline" : "horizontal"}`}
        defaultSelectedKeys={["listadoClientes"]}
        mode={isInline ? "inline" : "horizontal"}
        onClick={handleMenuClick}
        items={[
          {
            label: t("sideBar.profile"),
            icon: <UserOutlined />,
            key: "perfil",
          },
          {
            label: t("sideBar.myContracts"),
            icon: <FileDoneOutlined />,
            key: "contratosCliente",
          },
          {
            label: t("sideBar.motorcycleList"),
            icon: <SearchOutlined />,
            key: "motosCliente",
          },

          {
            label: t("sideBar.FAQ"),
            icon: <IoDocumentOutline />,
            key: "faq",
          },
          {
            label: t("sideBar.traduction"),
            icon: <FlagOutlined />,
            key: "traduccion",
            children: [
              {
                label: t("sideBar.spanish"),
                key: "spanish",
                value: "es",
              },
              {
                label: t("sideBar.english"),
                key: "english",
                value: "en",
              },
            ],
          },
          {
            label: "Cerrar sesión",
            icon: <LogoutOutlined />,
            key: "logout",
            value: "logout",
          },
        ]}
      ></Menu>
    </>
  );
};

export default MenuHome;