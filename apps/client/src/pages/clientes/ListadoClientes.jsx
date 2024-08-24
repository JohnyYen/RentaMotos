import { Space, Flex, Typography, Table, Button } from "antd";
import { useState } from "react";
import "../../App.css";

const ListadoClientes = () => {

  return (
    <Flex vertical="true">
      <Typography.Title level={3}>Listado de Clientes</Typography.Title>
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
            dataIndex: "fecha actual",
            key: "fecha actual",
            fixed: "left",
            width: "7rem"
          },
          {
            title: "Municipio",
            dataIndex: "municipio",
            key: "municipio",
          },
          {
            title: "Nombre",
            dataIndex: "nombre",
            key: "nombre",
          },
          {
            title: "CI",
            dataIndex: "ci",
            key: "ci",
            fixed: "left"
          },
          {
            title: "Veces alquiladas",
            dataIndex: "veces alquiladas",
            key: "veces alquiladas",
          },
          {
            title: "Valor alquileres",
            dataIndex: "valor alquileres",
            key: "valor alquileres",
          },
          {
            title: "Acciones",
            key: "acciones",
            render: (_, record) => (
              <Flex align="center" justify="center" gap="1rem">
                <Button className="accionTable">Modificar</Button>
                <Button className="accionTable">Eliminar</Button>
              </Flex>
            ),
            fixed: "right",
            width: "14rem"
          },
        ]}
      ></Table>
    </Flex>
  );
};

export default ListadoClientes;
