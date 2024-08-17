import { Space, Typography, Table } from "antd";
import { useState } from "react";

const ListadoContratos = () => {

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={3}>Listado de Contratos</Typography.Title>
      <Table
        pagination={{
          pageSize: 5,
        }}
        
        columns={[
          {
            title: "Nombre",
            dataIndex: "nombre",
            key: "nombre",
          },
          {
            title: "Matricula",
            dataIndex: "matricula",
            key: "matricula",
          },
          {
            title: "Marca",
            dataIndex: "marca",
            key: "marca",
          },
          {
            title: "modelo",
            dataIndex: "modelo",
            key: "modelo",
          },
          {
            title: "Forma de pago",
            dataIndex: "forma de pago",
            key: "forma de pago",
          },
          {
            title: "Fecha de inicio",
            dataIndex: "fecha de inicio",
            key: "Fecha de inicio",
          },
          {
            title: "Fecha de fin",
            dataIndex: "fecha de fin",
            key: "fecha de fin",
          },
          {
            title: "Prórroga",
            dataIndex: "prórroga",
            key: "prórroga",
          },
          {
            title: "Seguro adicional",
            dataIndex: "seguro adicional",
            key: "seguro adicional",
          },
          {
            title: "Importe total",
            dataIndex: "importe total",
            key: "importe total",
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

export default ListadoContratos;
