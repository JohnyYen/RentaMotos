import { Space, Typography, Table, Flex } from "antd";
import { useState } from "react";

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

  return (
    <Flex vertical="true">
      <Typography.Title level={3}>Situacion de Motos</Typography.Title>
      <Table
       scroll={{
        x: 920,
      }}
        pagination={{
          pageSize: 7,
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
    </Flex>
  );
};

export default SituacionMoto;
