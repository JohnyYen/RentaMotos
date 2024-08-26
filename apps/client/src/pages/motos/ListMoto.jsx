import { Mentions, Typography, Table, Flex, Button } from "antd";
import "../../App.css";
import axios from "axios";
import { DownloadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

// console.log('Hello MotherFucker');

const extractData = async () => {
  let dataSource = [];
  let response = null;
  try {
    response = await axios.get("http://localhost:3000/api/moto");

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

const ListMoto = () => {
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
      <Typography.Title level={3}>Listado de Motos</Typography.Title>
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
              },
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
                <Button className="actionTable" type="primary">
                  Modificar
                </Button>
                <Button className="actionTable" type="primary">
                  Delete
                </Button>
              </Flex>
            ),
            fixed: "right",
            width: "13rem",
          },
        ]}
      />
      <Button
        className="ant-btn-download"
        type="primary"
        icon={<DownloadOutlined />}
        shape="round"
      >
        Descargar PDF
      </Button>
    </Flex>
  );
};

export default ListMoto;
