import { Space, Flex, Typography, Table, Button, Input, Mentions } from "antd";
import { useEffect, useState } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import "../../App.css";
import axios from "axios";

const extractData = async () => {
  let dataSource = [];
  let response = null;
  try {
    response = await axios.get("http://localhost:3000/api/client");

    if (response.status === 200) {
      dataSource = response.data.map((element, index) => ({
        key: index,
        matricula: element.matricula,
        marca: element.marca,
        modelo: element.modelo,
        color: element.color,
        "Km recorridos": element.cantkm,
      }));
    }
  } catch (error) {
    console.log(error);
  }
  return dataSource;
};

const ListadoClientes = () => {
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  const currentDate = `${day}/${month}/${year}`;

  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    extractData().then((result) => {
      setDataSource(result);
    });
  }, []);


  return (
    <Flex vertical="true">
      <Typography.Title level={3}>Listado de Clientes</Typography.Title>
      <Flex align="center">
        <Typography.Text style={{ fontSize: "1rem", fontWeight: "500" }}>
          Fecha actual:
        </Typography.Text>
        <Mentions
          style={{ width: "6rem", fontSize: "1rem", fontWeight: "500" }}
          readOnly
          variant="borderless"
          defaultValue={currentDate}
        />
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
            title: "Municipio",
            dataIndex: "municipio",
            key: "municipio",
            fixed: "left",
            filters: [],
            onFilter: (value, record) => record.municipio.indexOf(value) === 0,
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
                <Button className="accionTable" type="primary">Modificar</Button>
                <Button className="accionTable" type="primary">Eliminar</Button>
              </Flex>
            ),
            fixed: "right",
            width: "13rem",
          },
        ]}
      ></Table>
      <Button className="ant-btn-download" type="primary" icon={<DownloadOutlined />} shape="round">Descargar PDF</Button>
    </Flex>
  );
};

// const extractData = async () => {
//   try {
//     const dataClient = await axios.get("http://localhost:3000/api/client");
//     console.log(dataClient);
//   } catch (error) {
//     console.log(error);
//   }
//   return dataClient.data;
// };

export default ListadoClientes;
