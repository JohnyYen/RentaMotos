import { Mentions, Button, Typography, Table, Flex } from "antd";
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

const ContratosMarcaModelo = () => {
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
      <Typography.Title level={3}>Contratos por marca y modelo</Typography.Title>
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
            title: "Marca",
            dataIndex: "marca",
            key: "marca",
            fixed: "left",
            filters: [],
            onFilter: (value, record) => record.marca.indexOf(value) === 0
          },
          {
            title: "Modelo",
            dataIndex: "modelo",
            key: "modelo",
            fixed: "left",
            filters: [],
            onFilter: (value, record) => record.modelo.indexOf(value) === 0,
          },
          {
            title: "Cantidad de motos",
            dataIndex: "cantidad de motos",
            key: "cantidad de motos",
          },
          {
            title: "Dias totales alquilados",
            dataIndex: "dias totales alquilados",
            key: "dias totales alquilados",
          },
          {
            title: "Ingresos tarjeta de crédito",
            dataIndex: "ingresos tarjeta de crédito",
            key: "ingresos tarjeta de crédito",
          },
          {
            title: "Ingresos por cheques",
            dataIndex: "ingresos por cheques",
            key: "ingresos por cheques",
          },
          {
            title: "Ingresos por efectivo",
            dataIndex: "ingresos por efectivo",
            key: "ingresos por efectivo",
          },
          {
            title: "Ingresos totales",
            dataIndex: "ingresos totales",
            key: "ingresos totales",
          },
        ]}
      ></Table>
      
      <Button className="ant-btn-download" type="primary" icon={<DownloadOutlined />} shape="round">Descargar PDF</Button>
    </Flex>
  );
};

export default ContratosMarcaModelo;
