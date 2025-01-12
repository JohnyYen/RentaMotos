import { CarOutlined, DollarOutlined, FileDoneOutlined, FlagOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const MenuWorker = ({ isInline = false }) => {
    const navigate = useNavigate();
    const [t, i18n] = useTranslation("global");
    const [current, setCurrent] = useState('listadoClientes');
  
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
        selectedKeys={[current]}
        mode={isInline ? "inline" : "horizontal"}
        onClick={(item) => {
          if (item.key !== "spanish" && item.key !== "english" && item.key !== "logout") {
            setCurrent(item.key);
            navigate(`/worker/${item.key}`);
          } else if( item.key === 'english' || item.key === 'spanish' ){
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
              label: t("sideBar.clientList"),
              key: "listadoClientes",
              icon: <UserOutlined />,
            },
            {
              label: t("sideBar.motorcycleList"),
              key: "listadoMoto",
              icon: <CarOutlined />,
            },
            {
              label: t("sideBar.contractList"),
              key: "listadoContratos",
              icon: <FileDoneOutlined />,
            },
            {
              label: t("sideBar.annualIncome"),
              icon: <DollarOutlined />,
              key: "ingresosAño",
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
                icon: <LogoutOutlined/>,
                key: "logout",
                value: "logout",
              },
          ]}
      ></Menu>
    </>
  );
};

export default MenuWorker;