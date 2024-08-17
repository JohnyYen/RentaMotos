import { Space, Typography, Table } from "antd";
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
    <Space size={20} direction="vertical">
      <Typography.Title level={3}>Situacion de Motos</Typography.Title>
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
            title: "Situacion",
            dataIndex: "situacion",
            key: "situacion",
          },
          {
            title: "Fin de contrato",
            dataIndex: "Fin de contrato",
            key: "Fin de contrato",
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

export default SituacionMoto;
