import { Mentions, Button, Typography, Table, Flex, notification } from "antd";
import { useState, useEffect } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import axios from "axios";

const extractData = async () => {
  let dataSource = [];
  let response = null;
  try {
    response = await axios.get("http://localhost:3000/api/moto/situation");

    if (response.status === 200) {
      dataSource = response.data.map((element, index) => ({
        key: index,
        matricula: element.matricula,
        marca: element.marca,
        situacion: element.situacion,
        "Fin de contrato": element.fecha_entrega
          ? element.fecha_entrega
          : "SIN ALQUILAR",
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
    link.download = 'Situacion moto.pdf';
    link.click();
    
    // Limpiar el objeto URL creado
    URL.revokeObjectURL(urlObject);
  } catch (error) {
    notification.info({
      message: "Descarga de PDF",
      description: 'La lista de la situacion de las motos esta vacia'
    });
  }
};

const SituacionMoto = () => {
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  const currentDate = `${day}/${month}/${year}`;

  const [dataSource, setDataSource] = useState([]);
  const [t] = useTranslation("global");

  useEffect(() => {
    extractData().then((result) => {
      setDataSource(result);
    });
  }, []);

  const onClick = async () => {
    await downloadPDF("http://localhost:3000/api/moto/situation/pdf");
  };

  return (
    <Flex vertical="true">
      <Typography.Title level={3}>
        {t("motorcycle.motorcycleSituation")}
      </Typography.Title>
      <Flex align="center">
        <Typography.Text style={{ fontSize: "1rem", fontWeight: "500" }}>
          {t("mainContent.currentDate")}:
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
          pageSize: 4,
          position: ["bottomLeft"],
        }}
        dataSource={dataSource}
        columns={[
          {
            title: t("mainContent.table.serialNumber"),
            dataIndex: "matricula",
            key: "matricula",
            fixed: "left",
            width: "8rem",
          },
          {
            title: t("mainContent.table.mark"),
            dataIndex: "marca",
            key: "marca",
          },
          {
            title: t("mainContent.table.situation"),
            dataIndex: "situacion",
            key: "situacion",
          },
          {
            title: t("mainContent.table.endContract"),
            dataIndex: "Fin de contrato",
            key: "Fin de contrato",
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

export default SituacionMoto;
