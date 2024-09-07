import { Mentions, Typography, Table, Flex, Button } from "antd";
import { useState } from "react";
import { DownloadOutlined } from "@ant-design/icons";

const SituacionMoto = () => {
  const dataSource = [
    {
      key: "1",
      fecha: "20/08/2024",
      matricula: "perra123",
      marca: "yamaha",
      situacion: "Alquilada",
      "Fin de contrato": "30/08/2024",
    },
    {
      key: "1",
      fecha: "20/08/2024",
      matricula: "perra123",
      marca: "yamaha",
      situacion: "Alquilada",
      "Fin de contrato": "30/08/2024",
    },
    {
      key: "1",
      fecha: "20/08/2024",
      matricula: "perra123",
      marca: "yamaha",
      situacion: "Alquilada",
      "Fin de contrato": "30/08/2024",
    },
    {
      key: "1",
      fecha: "20/08/2024",
      matricula: "perra123",
      marca: "yamaha",
      situacion: "Alquilada",
      "Fin de contrato": "30/08/2024",
    },
    {
      key: "1",
      fecha: "20/08/2024",
      matricula: "perra123",
      marca: "yamaha",
      modelo: "458feg",
      situacion: "Alquilada",
      "Fin de contrato": "30/08/2024",
    },
    {
      key: "1",
      fecha: "20/08/2024",
      matricula: "perra123",
      marca: "yamaha",
      modelo: "458feg",
      situacion: "Alquilada",
      "Fin de contrato": "30/08/2024",
    },
    {
      key: "1",
      fecha: "20/08/2024",
      matricula: "perra123",
      marca: "yamaha",
      situacion: "Alquilada",
      "Fin de contrato": "30/08/2024",
    },
    {
      key:  "1",
      fecha: "20/08/2024",
      matricula: "perra123",
      marca: "yamaha",
      situacion: "Alquilada",
      "Fin de contrato": "30/08/2024",
    },
    {
      key: "1",
      fecha: "20/08/2024",
      matricula: "perra123",
      marca: "yamaha",
      situacion: "Alquilada",
      "Fin de contrato": "30/08/2024",
    },
  ];

  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  const currentDate = `${day}/${month}/${year}`;

  return (
    <Flex vertical="true">
      <Typography.Title level={3}>Situacion de Motos</Typography.Title>
      <Flex align="center">
        <Typography.Text style={{fontSize: "1rem", fontWeight: "500"}}>Fecha actual:</Typography.Text>
        <Mentions style={{width: "6rem", fontSize: "1rem", fontWeight: "500"}} readOnly variant="borderless" defaultValue={currentDate} />
      </Flex>
      <Table
       scroll={{
        x: 920,
      }}
        pagination={{
          pageSize: 6,
          position: ["bottomLeft"],
        }}
        dataSource={dataSource}
        columns={[
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
            title: "Situacion",
            dataIndex: "situacion",
            key: "situacion",
          },
          {
            title: "Fin de contrato",
            dataIndex: "Fin de contrato",
            key: "Fin de contrato",
          },
        ]}
      ></Table>
      
      <Button className="ant-btn-download" type="primary" icon={<DownloadOutlined />} shape="round">Descargar PDF</Button>
    </Flex>
  );
};

export default SituacionMoto;
