import { Space, Typography, Table, Flex, Button } from "antd";
import { useState, useEffect, useContext } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";

const extractData = async (idcliente) => {
  let dataSource = [];
  let response = null;
  try {
    response = await axios.get(`http://localhost:3000/api/contract/${idcliente}`);
    console.log(response);

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
        "seguro adicional": element.seguro ? "✔" : "❌",
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
  const [dataSource, setDataSource] = useState([]);
  const [t] = useTranslation("global");
  const {client} = useContext(GlobalContext);
  useEffect(() => {
    extractData(client.idcliente).then((result) => {
      setDataSource(result);
    });
  }, []);

  return (
    <Flex vertical="true">
      <Typography.Title level={3}>
        {t("contract.contractList")}
      </Typography.Title>
      <Flex align="center" justify="flex-end">
        <Button
          className="actionTable"
          style={{ marginBottom: "1rem", marginRight: "1rem" }}
          type="primary"
        >
          {t("mainContent.createContract")}
        </Button>
      </Flex>
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
            title: t("mainContent.table.name"),
            dataIndex: "nombre",
            key: "nombre",
            fixed: "left",
            width: "8rem",
          },
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
            dataIndex: "fecha de fin",
            key: "fecha de fin",
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
