import {
  CarOutlined,
  DollarOutlined,
  FileDoneOutlined,
  FlagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Flex } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../../App.css";
import "boxicons";
//import axios from 'axios';

const SideBarWorker = () => {
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
        className="sider-menu"
        defaultSelectedKeys={["/listadoClientes"]}
        defaultOpenKeys={["/clientes"]}
        mode="inline"
        onClick={(item) => {
          if (item.key !== "spanish" && item.key !== "english") {
            navigate(`/worker/${item.key}`);
          } else {
            if (item.key === "spanish") {
              language("es");
            } else {
              language("en");
            }
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
        ]}
      ></Menu>
    </>
  );
};

export default SideBarWorker;
