import {
    CarOutlined,
    DollarOutlined,
    FileAddOutlined,
    FileDoneOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  import { Menu, Flex } from "antd";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { useTranslation } from "react-i18next";
  import "../App.css";
  import "boxicons";
  
  const SideBarClient = () => {
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
            navigate(`/client/${item.key}`);
          }}
          items={[
            {
              label: t("sideBar.clientList"),
              icon: <FileAddOutlined />,
              key: "crearContrato",
            },
            {
                label: t("sideBar.myContracts"),
                icon: <FileDoneOutlined />,
                key: "contratosCliente",
            },
            {
              label: t("sideBar.motorcycleList"),
              icon: <CarOutlined />,
              key: "motosCliente",
            },
          ]}
        ></Menu>
      </>
    );
  };
  
  export default SideBarClient;
  