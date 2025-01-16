import {
  CarOutlined,
  DollarOutlined,
  FileDoneOutlined,
  FlagOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { PiHardHat } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const MenuAdmin = ({ isInline = false }) => {
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

  return (
    <>
      <Menu
        theme="dark"
        className={`navBar-menu ${isInline ? "inline" : "horizontal"} navBar-menu-admin`}
        defaultSelectedKeys={["listadoClientes"]}
        mode={isInline ? "inline" : "horizontal"}
        onClick={(item) => {
          if (
            item.key !== "spanish" &&
            item.key !== "english" &&
            item.key !== "logout"
          ) {
            navigate(`/admin/${item.key}`);
          } else if (item.key === "english" || item.key === "spanish") {
            if (item.key === "spanish") {
              language("es");
            } else {
              language("en");
            }
          } else {
            navigate(`/loguin`);
          }
        }}
        items={[
          {
            label: t("sideBar.client"),
            icon: <UserOutlined />,
            key: "/clientes",
            children: [
              {
                label: t("sideBar.clientList"),
                key: "",
              },
              {
                label: t("sideBar.clientNonCompliant"),
                key: "incumplidoresClientes",
              },
            ],
          },
          {
            label: t("sideBar.motorcycle"),
            icon: <CarOutlined />,
            key: "/motos",
            children: [
              {
                label: t("sideBar.motorcycleList"),
                key: "listadoMoto",
              },
              {
                label: t("sideBar.motorcycleSituation"),
                key: "situacionMotos",
              },
            ],
          },
          {
            label: t("sideBar.contract"),
            icon: <FileDoneOutlined />,
            key: "/contratos",
            children: [
              {
                label: t("sideBar.contractList"),
                key: "listadoContratos",
              },
              {
                label: t("sideBar.contractMakeModel"),
                key: "contratoMarcaModelo",
              },
              {
                label: t("sideBar.contractMunicipality"),
                key: "contratoMunicipio",
              },
            ],
          },
          {
            label: t("sideBar.annualIncome"),
            icon: <DollarOutlined />,
            key: "ingresosAño",
          },
          {
            label: "Trabajadores",
            icon: <PiHardHat />,
            key: "listadoTrabajadores",
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

export default MenuAdmin;
