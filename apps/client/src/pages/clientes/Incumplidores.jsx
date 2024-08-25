import { Mentions, Typography, Table, Flex } from "antd";
import { useState } from "react";

const Incumplidores = () => {
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  const currentDate = `${day}/${month}/${year}`;

  return (
    <Flex vertical="true">
      <Typography.Title level={3}>Clientes Incumplidores</Typography.Title>
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

        columns={[
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
      <Button className="ant-btn-download" type="primary" icon={<DownloadOutlined />} shape="round">Descargar PDF</Button>
    </Flex>
  );
};

export default Incumplidores;
