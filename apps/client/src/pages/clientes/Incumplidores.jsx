import { Space, Typography, Table } from "antd";
import { useState } from "react";

const Incumplidores = () => {

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={3}>Clientes Incumplidores</Typography.Title>
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
            title: "Nombre",
            dataIndex: "nombre",
            key: "nombre",
          },
          {
            title: "Apellidos",
            dataIndex: "apellidos",
            key: "apellidos",
          },
          {
            title: "Fin de contrato",
            dataIndex: "fin de contrato",
            key: "fin de contrato",
          },
          {
            title: "Entrega de moto",
            dataIndex: "entrega de moto",
            key: "entrega de moto",
          },
          {
            title: "Acciones",
            key: "acciones",
            render: (_, record) => (
              <Space size="middle">
                <button>Modificar</button>
                <button>Delete</button>
              </Space>
            ),
          },
        ]}
      ></Table>
    </Space>
  );
};

export default Incumplidores;
