import { Mentions, Typography, Table, Flex, Button } from "antd";
import { useState } from "react";
import "../../App.css";
import axios from 'axios';
import { DownloadOutlined } from "@ant-design/icons";

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

  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  const currentDate = `${day}/${month}/${year}`;

  const data = extractData();

  return (
    <Flex vertical="true">
      <Typography.Title level={3}>Listado de Motos</Typography.Title>
      <Flex align="center">
        <Typography.Text style={{fontSize: "1rem", fontWeight: "500"}}>Fecha actual:</Typography.Text>
        <Mentions style={{width: "6rem", fontSize: "1rem", fontWeight: "500"}} readOnly variant="borderless" defaultValue={currentDate} />
      </Flex>
      <Table
        scroll={{
          x: 920,
        }}
        pagination={{
          pageSize: 5,
          position: ["bottomLeft"],
        }}
        dataSource={dataSource}
        columns={[
          {
            title: "Matricula",
            dataIndex: "matricula",
            key: "matricula",
            fixed: "left",
            width: "8rem",
          },
          {
            title: "Marca",
            dataIndex: "marca",
            key: "marca",
            filters: [
              {
                text: "yamaha",
                value: "yamaha",
              },
              {
                text: "suzuki",
                value: "suzuki",
              }
            ],
            onFilter: (value, record) => record.marca.indexOf(value) === 0,
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
                <Button className="actionTable" type="primary">Modificar</Button>
                <Button className="actionTable" type="primary">Delete</Button>
              </Flex>
            ),
            fixed: "right",
            width: "13rem",
          },
        ]}
      />
      <Button className="ant-btn-download" type="primary" icon={<DownloadOutlined />} shape="round">Descargar PDF</Button>
    </Flex>
  );
};

const extractData = async () => {
  const data = null;
  try {
    data = await axios.get("http://localhost:3000/api/moto");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  return data.data;
};

export default ListMoto;
