import { Space, Typography, Table } from "antd";
import { useState } from "react";

const ContratosMunicipio = () => {
  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={3}>Contratos por Municipio</Typography.Title>
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
    </Space>
  );
};

export default ContratosMunicipio;
