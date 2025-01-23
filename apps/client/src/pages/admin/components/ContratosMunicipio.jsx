import { Mentions, Button, Typography, Table, Flex, notification } from "antd";
import { useState, useEffect } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import moment from "moment";
import axios from "axios";

const extractData = async () => {
  let dataSource = [];
  let response = null;
  try {
    const jwt = JSON.parse(sessionStorage.getItem('jwt'));
    response = await axios.get("http://localhost:3000/api/contract/mun", {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });

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
    const jwt = JSON.parse(sessionStorage.getItem('jwt'));
     const response = await axios.get('http://localhost:3000/api/client/mun', {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
     });
    if(response.status === 200){
      dataFilter = response.data
    }
  } catch (error) {
    console.log(error);
  }
  return dataFilter;
};

const downloadPDF = async (url) => {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "blob"
    });

    const apiUrl = URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = apiUrl;
    link.download = "ContratosMunicipio.pdf";
    link.click();

    URL.revokeObjectURL(apiUrl);
  } catch (error) {
    notification.info({
      message: "Descarga de PDF",
      description: 'La lista de contratos por municipio esta vacia'
    });
  }
};

const ContratosMunicipio = () => {
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

  const onClick = async () => {
    await downloadPDF("http://localhost:3000/api/contract/mun/pdf");
  };

  return (
    <Flex vertical="true">
      <Typography.Title level={3}>{t("contract.contractMunicipality")}</Typography.Title>
      <Flex align="center">
        <Typography.Text style={{fontSize: "1rem", fontWeight: "500"}}>{t("mainContent.currentDate")}:</Typography.Text>
        <Mentions style={{width: "8rem", fontSize: "1rem", fontWeight: "500"}} readOnly variant="borderless" defaultValue={moment().format('L')} />
      </Flex>
      <Table
        scroll={{
          x: 920,
        }}
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
            align: "center",
            filters: dataFilter,
            onFilter: (value, record) => record.municipio.indexOf(value) === 0,
          },
          {
            title: t("mainContent.table.mark"),
            dataIndex: "marca",
            key: "marca",
            filters: dataSource
            ? Array.from(
                new Set(dataSource.map((item) => item.marca))
              ).map((marca) => ({
                text: marca,
                value: marca,
              }))
            : [],
            onFilter: (value, record) =>
              record.marca.toLowerCase().includes(value.toLowerCase()),
            align: "center",
          },
          {
            title: t("mainContent.table.model"),
            dataIndex: "modelo",
            key: "modelo",
            filters: dataSource
            ? Array.from(
                new Set(dataSource.map((item) => item.modelo))
              ).map((modelo) => ({
                text: modelo,
                value: modelo,
              }))
            : [],
            onFilter: (value, record) =>
              record.modelo.toLowerCase().includes(value.toLowerCase()),
            align: "center",
          },
          {
            title: t("mainContent.table.daysRented"),
            dataIndex: "días alquilados",
            key: "días alquilados",
            align: "center",
          },
          {
            title: t("mainContent.table.extensionDays"),
            dataIndex: "días de prórroga",
            key: "días de prórroga",
            align: "center",
          },
          {
            title: t("mainContent.table.totalCash"),
            dataIndex: "total efectivo",
            key: "total efectivo",
            align: "center",
          },
          {
            title: t("mainContent.table.totalAmount"),
            dataIndex: "valor total",
            key: "valor total",
            align: "center",
          },
        ]}        
      ></Table>
      <Button
        className="ant-btn-download"
        onClick={onClick}
        type="primary"
        icon={<DownloadOutlined />}
        shape="round"
      >
        {t("mainContent.downloadPDF")}
      </Button>
    </Flex>
  );
};

export default ContratosMunicipio;
