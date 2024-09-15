import { Mentions, Button, Typography, Table, Flex } from "antd";
import { useState, useEffect } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
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

const extractDataFilter = async () => {
  let dataFilter = [];
  try {
     const response = await axios.get('http://localhost:3000/api/mun');
    if(response.status === 200){
      dataFilter = response.data
    }
  } catch (error) {
    console.log(error);
  }
  return dataFilter;
};

const ContratosMunicipio = () => {
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  const currentDate = `${day}/${month}/${year}`;
  
  const [dataSource, setDataSource] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [t] = useTranslation("global");

  useEffect(() => {
    extractData().then((result) => {
      setDataSource(result);
    });
    extractDataFilter().then(result => {
      setDataFilter(result.map(municipio => (
        {
          text: municipio.nommun,
          value: municipio.nommun,
        }
      )));
    });
  }, []);

  return (
    <Flex vertical="true">
      <Typography.Title level={3}>{t("contract.contractMunicipality")}</Typography.Title>
      <Flex align="center">
        <Typography.Text style={{fontSize: "1rem", fontWeight: "500"}}>{t("mainContent.currentDate")}:</Typography.Text>
        <Mentions style={{width: "6rem", fontSize: "1rem", fontWeight: "500"}} readOnly variant="borderless" defaultValue={currentDate} />
      </Flex>
      <Table
       style={{width:1200, height:300}}
        pagination={{
          pageSize: 4,
          position: ["bottomLeft"],
        }}
        dataSource={dataSource}
        columns={[
          {
            title: t("mainContent.table.municipality"),
            dataIndex: "municipio",
            key: "municipio",
            fixed: "left",
            filters: dataFilter,
            onFilter: (value, record) => record.municipio.indexOf(value) === 0,
          },
          {
            title: t("mainContent.table.mark"),
            dataIndex: "marca",
            key: "marca",
          },
          {
            title: t("mainContent.table.model"),
            dataIndex: "modelo",
            key: "modelo",
          },
          {
            title: t("mainContent.table.daysRented"),
            dataIndex: "días alquilados",
            key: "días alquilados",
          },
          {
            title: t("mainContent.table.extensionDays"),
            dataIndex: "días de prórroga",
            key: "días de prórroga",
          },
          {
            title: t("mainContent.table.totalCash"),
            dataIndex: "total efectivo",
            key: "total efectivo",
          },
          {
            title: t("mainContent.table.totalAmount"),
            dataIndex: "valor total",
            key: "valor total",
          },
        ]}
      ></Table>
    </Flex>
  );
};

export default ContratosMunicipio;
