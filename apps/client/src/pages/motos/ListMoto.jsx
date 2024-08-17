import { Space, Typography, Table } from "antd";
import { useState } from "react";

const ListMoto = () => {
  const dataSource = [
    {
      key: "1",
      fecha: "20/08/2024",
      matricula: "perra123",
      marca: "yamaha",
      modelo: "458feg",
      color: "azul",
      "Km recorridos": "50",
    },
    {
      key: "1",
      fecha: "20/08/2024",
      matricula: "perra123",
      marca: "yamaha",
      modelo: "458feg",
      color: "azul",
      "Km recorridos": "50",
    },
    {
      key: "1",
      fecha: "20/08/2024",
      matricula: "perra123",
      marca: "yamaha",
      modelo: "458feg",
      color: "azul",
      "Km recorridos": "50",
    },
    {
      key: "1",
      fecha: "20/08/2024",
      matricula: "perra123",
      marca: "yamaha",
      modelo: "458feg",
      color: "azul",
      "Km recorridos": "50",
    },
    {
      key: "1",
      fecha: "20/08/2024",
      matricula: "perra123",
      marca: "yamaha",
      modelo: "458feg",
      color: "azul",
      "Km recorridos": "50",
    },
    {
      key: "1",
      fecha: "20/08/2024",
      matricula: "perra123",
      marca: "yamaha",
      modelo: "458feg",
      color: "azul",
      "Km recorridos": "50",
    },
    {
      key: "1",
      fecha: "20/08/2024",
      matricula: "perra123",
      marca: "yamaha",
      modelo: "458feg",
      color: "azul",
      "Km recorridos": "50",
    },
    {
      key: "1",
      fecha: "20/08/2024",
      matricula: "perra123",
      marca: "yamaha",
      modelo: "458feg",
      color: "azul",
      "Km recorridos": "50",
    },
    {
      key: "1",
      fecha: "20/08/2024",
      matricula: "perra123",
      marca: "yamaha",
      modelo: "458feg",
      color: "azul",
      "Km recorridos": "50",
    },
  ];

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={3}>Listado de Motos</Typography.Title>
      <Table
        pagination={{
          pageSize: 5,
        }}
        dataSource={dataSource}
        columns={[
          {
            title: "Fecha",
            dataIndex: "fecha",
            key: "fecha",
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
            title: "Modelo",
            dataIndex: "modelo",
            key: "modelo",
          },
          {
            title: "Color",
            dataIndex: "color",
            key: "color",
          },
          {
            title: "Km recorridos",
            dataIndex: "Km recorridos",
            key: "Km recorridos",
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

export default ListMoto;
