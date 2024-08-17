import { Space, Typography, Table } from "antd";
import { useState } from "react";

const ContratosMarcaModelo = () => {

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={3}>Contratos por marca y modelo</Typography.Title>
      <Table
        pagination={{
          pageSize: 5,
        }}
        
        columns={[
        {
            title: "Fecha",
            dataIndex: "fecha",
            key: "fecha"
        },  
        {
            title: "Marca",
            dataIndex: "marca",
            key: "marca",
          },
          {
            title: "Modelo",
            dataIndex: "modelo",
            key: "modelo",
          },
          {
            title: "Cantidad de motos",
            dataIndex: "cantidad de motos",
            key: "cantidad de motos",
          },
          {
            title: "Dias totales alquilados",
            dataIndex: "dias totales alquilados",
            key: "dias totales alquilados",
          },
          {
            title: "Ingresos tarjeta de crédito",
            dataIndex: "ingresos tarjeta de crédito",
            key: "ingresos tarjeta de crédito",
          },
          {
            title: "Ingresos por cheques",
            dataIndex: "ingresos por cheques",
            key: "ingresos por cheques",
          },
          {
            title: "Ingresos por efectivo",
            dataIndex: "ingresos por efectivo",
            key: "ingresos por efectivo",
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

export default ContratosMarcaModelo;
