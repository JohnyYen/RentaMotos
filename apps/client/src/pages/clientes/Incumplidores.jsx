import { Space, Typography, Table, Flex } from "antd";
import { useState } from "react";

const Incumplidores = () => {

  return (
    <Flex vertical="true">
      <Typography.Title level={3}>Clientes Incumplidores</Typography.Title>
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
            dataIndex: "fecha",
            key: "fecha",
            fixed: "left",
            width: "7rem"
          },
          {
            title: "Nombre",
            dataIndex: "nombre",
            key: "nombre",
            fixed: "left",
            width: "8rem"
          },
          {
            title: "Apellidos",
            dataIndex: "apellidos",
            key: "apellidos",
          },
          {
            title: "Fin de contrato",
            dataIndex: "fin de contrato",
            key: "fin de contrato",
          },
          {
            title: "Entrega de moto",
            dataIndex: "entrega de moto",
            key: "entrega de moto",
          },
        ]}
      ></Table>
    </Flex>
  );
};

export default Incumplidores;
