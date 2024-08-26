import { Space, Typography, Table, Flex, Button } from "antd";
import { useState, useEffect } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import axios from "axios";

const extractData = async () => {
  let dataSource = [];
  let response = null;
  try {
    response = await axios.get("http://localhost:3000/api/contract");

    if (response.status === 200) {
      dataSource = response.data.map((element, index) => ({
        key: index,
        nombre: element.nombre,
        matricula: element.matricula,
        marca: element.marca,
        modelo: element.modelo,
        "forma de pago": element.formapago,
        "fecha de inicio": element.fechainicio,
        "fecha de fin": element.fechafin,
        prorroga: element.diasprorroga,
        "seguro adicional": element.seguro,
        "importe total": element.importe,
      }));
    }
  } catch (error) {
    console.log(error);
  }
  return dataSource;
};

const ListadoContratos = () => {

  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    extractData().then((result) => {
      setDataSource(result);
    });
  }, []);

  return (
    <Flex vertical="true">
      <Typography.Title level={3}>Listado de Contratos</Typography.Title>
      <Table
      scroll={{
        x: 1200,
      }}
        pagination={{
          pageSize: 5,
          position: ["bottomLeft"],
        }}
        dataSource={dataSource}
        columns={[
          {
            title: "Nombre",
            dataIndex: "nombre",
            key: "nombre",
            fixed: "left",
            width: "8rem"
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
            title: "modelo",
            dataIndex: "modelo",
            key: "modelo",
          },
          {
            title: "Forma de pago",
            dataIndex: "forma de pago",
            key: "forma de pago",
          },
          {
            title: "Fecha de inicio",
            dataIndex: "fecha de inicio",
            key: "Fecha de inicio",
          },
          {
            title: "Fecha de fin",
            dataIndex: "fecha de fin",
            key: "fecha de fin",
          },
          {
            title: "Prórroga",
            dataIndex: "prórroga",
            key: "prórroga",
          },
          {
            title: "Seguro adicional",
            dataIndex: "seguro adicional",
            key: "seguro adicional",
          },
          {
            title: "Importe total",
            dataIndex: "importe total",
            key: "importe total",
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
            width: "13rem"
          },
        ]}
      ></Table>
      <Button className="ant-btn-download" type="primary" icon={<DownloadOutlined />} shape="round">Descargar PDF</Button>
    </Flex>
  );
};

export default ListadoContratos;
