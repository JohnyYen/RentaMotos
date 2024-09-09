import {
  CarOutlined,
  DollarOutlined,
  FileDoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Flex } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../App.css";
import "boxicons";
//import axios from 'axios';

const SideBarAdmin = () => {
  const navigate = useNavigate();
  const [t] = useTranslation("global"); 

  return (
    <>
      <Flex align="center" justify="center">
        <box-icon
          name="cycling"
          size="md"
          color="white"
          style={{ marginTop: "1.5rem" }}
        ></box-icon>
      </Flex>
      <Menu
        theme="dark"
        className="sider-menu"
        defaultSelectedKeys={["/listadoClientes"]}
        defaultOpenKeys={["/clientes"]}
        mode="inline"
        onClick={(item) => {
          navigate(`/admin/${item.key}`);
        }}
        items={[
          {
            label: t("sideBar.client"),
            icon: <UserOutlined />,
            key: "/clientes",
            children: [
              {
                label: t("sideBar.clientList"),
                key: "listadoClientes",
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
        ]}
      ></Menu>
    </>
  );
};

export default SideBarAdmin;
