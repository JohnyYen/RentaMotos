import { Mentions, Button, Typography, Table, Flex, notification } from "antd";
import { useState, useEffect } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useTranslation } from "react-i18next";
import moment from "moment";

const extractData = async () => {
  let dataSource = [];
  let response = null;
  try {
    response = await axios.get("http://localhost:3000/api/client/bad");

    if (response.status === 200) {
      dataSource = response.data.map((element, index) => ({
        key: index,
        nombre: element.nomvre,
        apellidos: element.prim_apellido + ' ' + element.seg_apellido,
        "fin de contrato": element.fecha_fin,
        "entrega de moto": element.fecha_entrega,
      }));
    }
  } catch (error) {
    console.log(error);
  }
  return dataSource;
};

const downloadPDF = async (url) => {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/pdf',
      },
    });

    const urlObject = URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = urlObject;
    link.download = 'Incumplidores.pdf';
    link.click();
    
    // Limpiar el objeto URL creado
    URL.revokeObjectURL(urlObject);
  } catch (error) {
    notification.info({
      message: "Descarga de PDF",
      description: 'La lista de clientes incumplidores esta vacia'
    });
  }
};

const Incumplidores = () => {
  const [t] = useTranslation("global");
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    extractData().then((result) => {
      setDataSource(result);à
    });
  }, []);

  const onClick = async () => {
    await downloadPDF("http://localhost:3000/api/client/bad/pdf");
  };

  return (
    <Flex vertical="true">
      <Typography.Title level={3}>{t("client.clientNonCompliant")}</Typography.Title>
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
            title: t("mainContent.table.name"),
            dataIndex: "nombre",
            key: "nombre",
            fixed: "left",
            width: "8rem"
          },
          {
            title: t("mainContent.table.lastName"),
            dataIndex: "apellidos",
            key: "apellidos",
          },
          {
            title: t("mainContent.table.endContract"),
            dataIndex: "fin de contrato",
            key: "fin de contrato",
          },
          {
            title: t("mainContent.table.motorcycleDelivery"),
            dataIndex: "entrega de moto",
            key: "entrega de moto",
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

export default Incumplidores;
