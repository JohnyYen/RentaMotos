import {
  CarOutlined,
  DollarOutlined,
  FileDoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Flex } from "antd";
import {Outlet, useNavigate } from "react-router-dom";
import "../App.css";
import "boxicons";
//import axios from 'axios';

const SideBarAdmin = () => {
  const navigate = useNavigate();
  //const sourceData = axios.get()

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
          navigate(item.key);
        }}
        items={[
          {
            label: "Clientes",
            icon: <UserOutlined />,
            key: "/clientes",
            children: [
              {
                label: "Listado Clientes",
                key: `listadoClientes`,
              },
              {
                label: "Incumplidores",
                key: "/incumplidoresClientes",
              },
            ],
          },
          {
            label: "Motos",
            icon: <CarOutlined />,
            key: "/motos",
            children: [
              {
                label: "Listado Motos",
                key: "/listadoMoto",
              },
              {
                label: "Situacion Motos",
                key: "/situacionMotos",
              },
            ],
          },
          {
            label: "Contratos",
            icon: <FileDoneOutlined />,
            key: "/contratos",
            children: [
              {
                label: "Listado Contratos",
                key: "/listadoContratos",
              },
              {
                label: "Por marca y modelo",
                key: "/contratoMarcaModelo",
              },
              {
                label: "Por municipio",
                key: "/contratoMunicipio",
              },
            ],
          },
          {
            label: "Ingresos del año",
            icon: <DollarOutlined />,
            key: "/ingresosAño",
          },
        ]}
      ></Menu>
    </>
  );
};

export default SideBarAdmin;
