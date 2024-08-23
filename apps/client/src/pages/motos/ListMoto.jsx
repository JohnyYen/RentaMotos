import { Space, Typography, Table, Flex, Button } from "antd";
import { useState } from "react";
import "../../App.css";

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
    <Flex vertical="true">
      <Typography.Title level={3}>Listado de Motos</Typography.Title>
      <Table
      scroll={{
        x: 920,
      }}
        pagination={{
          pageSize: 5,
        }}
        dataSource={dataSource}
        columns={[
          {
            title: "Fecha",
            dataIndex: "fecha",
            key: "fecha",
            fixed: "left",
            width: "7rem"
          },
          {
            title: "Matricula",
            dataIndex: "matricula",
            key: "matricula",
            fixed: "left",
            width: "8rem"
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
              <Flex align="center" justify="center" gap="1rem">
                <Button className="actionTable">Modificar</Button>
                <Button className="actionTable">Delete</Button>
              </Flex>
            ),
            fixed: "right",
            width: "14rem"
          },
        ]}
      />
    </Flex>
  );
};

export default ListMoto;
