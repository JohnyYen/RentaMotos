import { Space, Typography, Table, Flex } from "antd";
import { useState } from "react";

const IngresosAnno = () => {
  return (
    <Flex vertical="true">
      <Typography.Title level={3}>Ingresos del año</Typography.Title>
      <Table
      scroll={{
        x: 1200,
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
            title: "Ingreso anual",
            dataIndex: "ingreso anual",
            key: "ingreso anual",
            fixed: "left"
          },
          {
            title: "Ingreso enero",
            dataIndex: "ingreso enero",
            key: "ingreso enero",
          },
          {
            title: "Ingreso febrero",
            dataIndex: "ingreso febrero",
            key: "ingreso febrero",
          },
          {
            title: "Ingreso marzo",
            dataIndex: "ingreso marzo",
            key: "ingreso marzo",
          },
          {
            title: "Ingreso abril",
            dataIndex: "ingreso abril",
            key: "ingreso abril",
          },
          {
            title: "Ingreso mayo",
            dataIndex: "ingreso mayo",
            key: "ingreso mayo",
          },
          {
            title: "Ingreso junio",
            dataIndex: "ingreso junio",
            key: "ingreso junio",
          },
          {
            title: "Ingreso julio",
            dataIndex: "ingreso julio",
            key: "ingreso julio",
          },
          {
            title: "Ingreso agosto",
            dataIndex: "ingreso agosto",
            key: "ingreso agosto",
          },
          {
            title: "Ingreso septiembre",
            dataIndex: "ingreso septiembre",
            key: "ingreso septiembre",
          },
          {
            title: "Ingreso octubre",
            dataIndex: "ingreso octubre",
            key: "ingreso octubre",
          },
          {
            title: "Ingreso noviembre",
            dataIndex: "ingreso noviembre",
            key: "ingreso noviembre",
          },
          {
            title: "Ingreso diciembre",
            dataIndex: "ingreso diciembre",
            key: "ingreso diciembre",
          },
        ]}
      ></Table>
    </Flex>
  );
};

export default IngresosAnno;
