import { Space, Typography, Table } from "antd";
import { useState } from "react";
import "../../App.css";

const ListadoClientes = () => {

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={3}>Listado de Clientes</Typography.Title>
      <Table
        pagination={{
          pageSize: 5,
        }}

        columns={[
          {
            title: "Fecha",
            dataIndex: "fecha",
            key: "fecha",
          },
          {
            title: "Municipio",
            dataIndex: "municipio",
            key: "municipio",
          },
          {
            title: "Nombre",
            dataIndex: "nombre",
            key: "nombre",
          },
          {
            title: "CI",
            dataIndex: "ci",
            key: "ci",
          },
          {
            title: "Veces alquiladas",
            dataIndex: "veces alquiladas",
            key: "veces alquiladas",
          },
          {
            title: "Valor alquileres",
            dataIndex: "valor alquileres",
            key: "valor alquileres",
          },
          {
            title: "Acciones",
            key: "acciones",
            render: (_, record) => (
              <Space size="middle">
                <button className="accionTable">Modificar</button>
                <button className="accionTable">Delete</button>
              </Space>
            ),
          },
        ]}
      ></Table>
    </Space>
  );
};

export default ListadoClientes;
