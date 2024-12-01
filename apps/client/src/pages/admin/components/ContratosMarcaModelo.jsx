import { Mentions, Button, Typography, Table, Flex, notification } from "antd";
import { useState, useEffect } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import axios from "axios";
import moment from "moment";

const extractData = async () => {
  let dataSource = [];
  let response = null;
  try {
    const jwt = JSON.parse(sessionStorage.getItem('jwt'));
    response = await axios.get("http://localhost:3000/api/contract/marcxmodel", {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    if (response.status === 200) {
      dataSource = response.data.data.map((element, index) => ({
        key: index,
        marca: element.marca,
        modelo: element.modelo,
        "cantidad de motos": element.cant_moto,
        "dias totales alquilados": element.diasalquilados,
        "ingresos tarjeta de crédito": element.valor_tarjeta_credito,
        "ingresos por cheques": element.valor_cheque,
        "ingresos por efectivo": element.valor_efectivo,
        "ingresos totales": element.ingreso_marca,
        "seguro adicional": element.seguro,
        "importe total": element.importe,
      }));
    }
  } catch (error) {
    console.log(error);
  }
  return dataSource;
};

const extractDataFilterMarca = async () => {
  let dataFilter = [];
  try {
    const jwt = JSON.parse(sessionStorage.getItem('jwt'));
    const response = await axios.get("http://localhost:3000/api/moto/marc", {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });

    if (response.status === 200) {
      dataFilter = response.data;
    }
  } catch (error) {
    console.log(error);
  }
  return dataFilter;
};

const extractDataFilterModelo = async () => {
  let dataFilter = [];
  try {
    const jwt = JSON.parse(sessionStorage.getItem('jwt'));
    const response = await axios.get("http://localhost:3000/api/moto/model", {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    if (response.status === 200) {
      dataFilter = response.data;
    }
  } catch (error) {
    console.log(error);
  }
  return dataFilter;    
}

const downloadPDF = async (url) => {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "blob",
    });

    const apiUrl = URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = apiUrl;
    link.download = "Contratos por marca y modelo.pdf";
    link.click();

    URL.revokeObjectURL(apiUrl);
  } catch (error) {
    notification.info({
      message: "Descarga de PDF",
      description: 'La lista de contratos por marca y modelo esta vacia'
    });
  }
};

const ContratosMarcaModelo = () => {
  const [dataSource, setDataSource] = useState([]);
  const [dataFilterMarca, setDataFilterMarca] = useState([]);
  const [dataFilterModelo, setDataFilterModelo] = useState([]);
  const [t] = useTranslation("global");

  useEffect(() => {
    extractData().then((result) => {
      setDataSource(result);
    });

    extractDataFilterMarca().then((result) => {
      setDataFilterMarca(
        result.map((marca) => ({
          text: marca.nommarca,
          value: marca.nomarca,
        }))
      );
    });

    extractDataFilterModelo().then((result) => {
      setDataFilterModelo(
        result.map((marca) => ({
          text: marca.nommodelo,
          value: marca.nommodelo,
        }))
      );
    });
  }, []);

  const onClick = async () => {
    await downloadPDF("http://localhost:3000/api/contract/marcxmodel/pdf");
  }

  return (
    <Flex vertical="true">
      <Typography.Title level={3}>
        {t("contract.contractMakeModel")}
      </Typography.Title>
      <Flex align="center">
        <Typography.Text style={{ fontSize: "1rem", fontWeight: "500" }}>
        {t("mainContent.currentDate")}:
        </Typography.Text>
        <Mentions
          style={{ width: "8rem", fontSize: "1rem", fontWeight: "500" }}
          readOnly
          variant="borderless"
          defaultValue={moment().format('L')}
        />
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
            title: t("mainContent.table.mark"),
            dataIndex: "marca",
            key: "marca",
            fixed: "left",
            filters: dataFilterMarca,
            onFilter: (value, record) => record.marca.indexOf(value) === 0,
          },
          {
            title: t("mainContent.table.model"),
            dataIndex: "modelo",
            key: "modelo",
            fixed: "left",
            filters: dataFilterModelo,
            onFilter: (value, record) => record.modelo.indexOf(value) === 0,
          },
          {
            title: t("mainContent.table.numberMotorcycle"),
            dataIndex: "cantidad de motos",
            key: "cantidad de motos",
          },
          {
            title: t("mainContent.table.totalDaysRented"),
            dataIndex: "dias totales alquilados",
            key: "dias totales alquilados",
          },
          {
            title: t("mainContent.table.creditCardIncome"),
            dataIndex: "ingresos tarjeta de crédito",
            key: "ingresos tarjeta de crédito",
          },
          {
            title: t("mainContent.table.incomeCheck"),
            dataIndex: "ingresos por cheques",
            key: "ingresos por cheques",
          },
          {
            title: t("mainContent.table.cashIncome"),
            dataIndex: "ingresos por efectivo",
            key: "ingresos por efectivo",
          },
          {
            title: t("mainContent.table.totalAmount"),
            dataIndex: "ingresos totales",
            key: "ingresos totales",
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

export default ContratosMarcaModelo;
