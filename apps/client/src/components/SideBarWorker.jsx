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
  
  const SideBarWorker = () => {
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
              label: "Listado Clientes",
              key: "listadoClientes",
              icon: <UserOutlined />,
            },
            {
              
              label: "Listado Motos",
              key: "listadoMoto",
              icon: <CarOutlined />,
            },
            {
              label: "Listado Contratos",
              key: "listadoContratos",
              icon: <FileDoneOutlined />,
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
  
  export default SideBarWorker;
  