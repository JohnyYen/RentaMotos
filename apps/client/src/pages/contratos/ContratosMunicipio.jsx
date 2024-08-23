import { Space, Typography, Table, Flex } from "antd";
import { useState } from "react";

const ContratosMunicipio = () => {
  return (
    <Flex vertical="true">
      <Typography.Title level={3}>Contratos por Municipio</Typography.Title>
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
            title: "Municipio",
            dataIndex: "municipio",
            key: "municipio",
            fixed: "left"
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
            title: "Días alquilados",
            dataIndex: "días alquilados",
            key: "días alquilados",
          },
          {
            title: "Días de prórroga",
            dataIndex: "días de prórroga",
            key: "días de prórroga",
          },
          {
            title: "Total efectivo",
            dataIndex: "total efectivo",
            key: "total efectivo",
          },
          {
            title: "Valor total",
            dataIndex: "valor total",
            key: "valor total",
          },
        ]}
      ></Table>
    </Flex>
  );
};

export default ContratosMunicipio;
