import { Mentions, Button, Typography, Table, Flex } from "antd";
import { useState, useEffect } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import axios from "axios";

const extractData = async () => {
  let dataSource = [];
  let response = null;
  try {
    response = await axios.get("http://localhost:3000/api/contract/mun");

    if (response.status === 200) {
      dataSource = response.data.map((element, index) => ({
        key: index,
        municipio: element.nommun,
        marca: element.marca,
        modelo: element.modelo,
        "días alquilados": element.diasalquilados,
        "días de prórroga": element.diasprorroga,
        "total efectivo": element.valor_efectivo,
        "valor total": element.valor_general,
      }));
    }
  } catch (error) {
    console.log(error);
  }
  return dataSource;
};

const ContratosMunicipio = () => {
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
      <Typography.Title level={3}>Contratos por Municipio</Typography.Title>
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
            title: "Marca",
            dataIndex: "marca",
            key: "marca",
          },
          {
            title: "Modelo",
            dataIndex: "modelo",
            key: "modelo",
          },
          {
            title: "Días alquilados",
            dataIndex: "días alquilados",
            key: "días alquilados",
          },
          {
            title: "Días de prórroga",
            dataIndex: "días de prórroga",
            key: "días de prórroga",
          },
          {
            title: "Total efectivo",
            dataIndex: "total efectivo",
            key: "total efectivo",
          },
          {
            title: "Valor total",
            dataIndex: "valor total",
            key: "valor total",
          },
        ]}
      ></Table>
      
      <Button className="ant-btn-download" type="primary" icon={<DownloadOutlined />} shape="round">Descargar PDF</Button>
    </Flex>
  );
};

export default ContratosMunicipio;
