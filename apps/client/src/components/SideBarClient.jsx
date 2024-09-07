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
  import "../App.css";
  import "boxicons";
  
  const SideBarClient = () => {
    const navigate = useNavigate();
  
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
              label: "Crear contrato",
              icon: <FileAddOutlined />,
              key: "crearContrato",
            },
            {
                label: "Mis contratos",
                icon: <FileDoneOutlined />,
                key: "contratosCliente",
            },
            {
              label: "Listado motos",
              icon: <CarOutlined />,
              key: "motosCliente",
            },
          ]}
        ></Menu>
      </>
    );
  };
  
  export default SideBarClient;
  