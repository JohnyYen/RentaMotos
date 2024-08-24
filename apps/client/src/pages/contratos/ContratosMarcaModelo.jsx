import { Space, Typography, Table, Flex } from "antd";
import { useState } from "react";

const ContratosMarcaModelo = () => {

  return (
    <Flex vertical="true">
      <Typography.Title level={3}>Contratos por marca y modelo</Typography.Title>
      <Table
      scroll={{
        x: 920,
      }}
        pagination={{
          pageSize: 5,
        }}
        
        columns={[
        {
            title: "Fecha actual",
            dataIndex: "fecha actual",
            key: "fecha actual",
            fixed: "left",
            width: "7rem"
        },  
        {
            title: "Marca",
            dataIndex: "marca",
            key: "marca",
            fixed: "left"
          },
          {
            title: "Modelo",
            dataIndex: "modelo",
            key: "modelo",
            fixed: "left"
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
            title: "Ingresos totales",
            dataIndex: "ingresos totales",
            key: "ingresos totales",
          },
        ]}
      ></Table>
    </Flex>
  );
};

export default ContratosMarcaModelo;
