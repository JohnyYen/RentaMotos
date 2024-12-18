import { Space, Typography, Table, Flex, Button } from "antd";
import { useState, useEffect, useContext } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { GlobalContext } from "../../../context/GlobalContext";
import { pdf } from "@react-pdf/renderer";
import DocumentPDF from "../../../components/DocumentPDF";
import ModalCreateContract from "../../../components/ModalCreateContract";


const extractData = async (client) => {
  let dataSource = [];
  let response = null;
  try {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    response = await axios.get(`http://localhost:3000/api/contract/${client?.idcliente}`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    console.log(response.data);

    if (response.status === 200) {
      dataSource = response.data.data.map((element, index) => ({
        key: index ,
        matricula: element.matricula,
        marca: element.marca,
        modelo: element.modelo,
        "forma de pago": element.formapago,
        "fecha de inicio": element.fechainicio,
        "fechaFin": element.fechafin,
        prorroga: element.diasprorroga,
        "seguro adicional": element.seguro ? "Si" : "No",
        "importe total": element.importe,
      }));
      console.log(dataSource);
    }
  } catch (error) {
    console.log(error);
  }
  return dataSource;
};


const ListadoContratos = () => {
  const [dataSource, setDataSource] = useState();
  const [t] = useTranslation("global");
  const { client } = useContext(GlobalContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    extractData(client).then((result) => {
      setDataSource(result);
    });
  }, [client]);

  const handleRowClick = async (record) => {
    const blob = await pdf(<DocumentPDF client = { client } dataContract={record} />).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  return (
    <Flex vertical="true">
        <ModalCreateContract isVisible={visible} setVisible={() => setVisible(!visible)} setDataSource={setDataSource} dataSource={dataSource}/>
      <Typography.Title level={3}>
        {t("contract.contractList")}
      </Typography.Title>
      <Flex align="center" justify="flex-end">
        <Button
          onClick={() => setVisible(true)}
          className="actionTable"
          style={{ marginBottom: "1rem", marginRight: "1rem" }}
          type="primary"
        >
          {t("mainContent.createContract")}
        </Button>
      </Flex>
      <Table
         scroll={{
          x: 920,
        }}
        pagination={{
          pageSize: 4,
          position: ["bottomLeft"],
        }}
        onRow={(record) => {
          return {
            onClick: (e) => handleRowClick(record),
          };
        }}
        dataSource={dataSource}
        columns={[
          {
            title: t("mainContent.table.serialNumber"),
            dataIndex: "matricula",
            key: "matricula",
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
            title: t("mainContent.table.methodPayment"),
            dataIndex: "forma de pago",
            key: "forma de pago",
          },
          {
            title: t("mainContent.table.startContract"),
            dataIndex: "fecha de inicio",
            key: "Fecha de inicio",
          },
          {
            title: t("mainContent.table.endContract"),
            dataIndex: "fechaFin",
            key: "fechaFin",
          },
          {
            title: t("mainContent.table.extension"),
            dataIndex: "prorroga",
            key: "prorroga",
          },
          {
            title: t("mainContent.table.additionalInsurance"),
            dataIndex: "seguro adicional",
            key: "seguro adicional",
          },
          {
            title: t("mainContent.table.totalAmount"),
            dataIndex: "importe total",
            key: "importe total",
          },
        ]}
      ></Table>
    </Flex>
  );
};

export default ListadoContratos;
