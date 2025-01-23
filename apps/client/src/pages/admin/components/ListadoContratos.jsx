import {
  Space,
  Typography,
  Table,
  Flex,
  Button,
  notification,
  Modal,
} from "antd";
import { useState, useEffect, useContext } from "react";
import { DeleteOutlined, DownloadOutlined, EditOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import axios from "axios";
import EliminarContrato from "../../../components/EliminarContrato";
import ModalModContract from "../../../components/ModalModContract";
import { GlobalContext } from "../../../context/GlobalContext";
import DocumentPDF from "../../../components/DocumentPDF";
import { pdf } from "@react-pdf/renderer";

const downloadPDF = async (url) => {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "blob",
      headers: {
        "Content-Type": "application/pdf",
      },
    });

    const urlObject = URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = urlObject;
    link.download = "ReporteContratos.pdf";
    link.click();

    URL.revokeObjectURL(urlObject);
  } catch (error) {
    notification.info({
      message: "Descarga de PDF",
      description: "La lista de Contratos esta vacia",
    });
  }
};

const ListadoContratos = ({ dataContract, setDataContract, url }) => {
  const [t] = useTranslation("global");
  const { setRow } = useContext(GlobalContext);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const onClick = async () => {
    await downloadPDF(url);
  };

  // const handleRowClick = async (record) => {
  //   const blob = await pdf(<DocumentPDF dataContract={record} />).toBlob();
  //   const url = URL.createObjectURL(blob);
  //   window.open(url);
  // };

  return (
    <Flex vertical="true">
      <ModalModContract isOpen={visible} setOpen={() => setVisible(!visible)} />
      <EliminarContrato
        isOpen={open}
        setOpen={() => setOpen(!open)}
        setDataSource={setDataContract}
        dataSource={dataContract}
      />
      <Typography.Title level={3}>
        {t("contract.contractList")}
      </Typography.Title>
      <Table
        scroll={{
          x: 920,
        }}
        pagination={{
          pageSize: 4,
          position: ["bottomLeft"],
        }}
        // onRow={(record) => {
        //   return {
        //     onClick: (e) => handleRowClick(record),
        //   };
        // }}
        dataSource={dataContract}
        columns={[
          {
            title: t("mainContent.table.name"),
            dataIndex: "nombre",
            key: "nombre",
            filters: dataContract
            ? Array.from(
                new Set(dataContract.map((item) => item.nombre))
              ).map((nombre) => ({
                text: nombre,
                value: nombre,
              }))
            : [],
            onFilter: (value, record) =>
              record.nombre.toLowerCase().includes(value.toLowerCase()),
            fixed: "left",
            width: "8rem",
            align: "center",
          },
          {
            title: t("mainContent.table.serialNumber"),
            dataIndex: "matricula",
            key: "matricula",
            filters: dataContract
            ? Array.from(
                new Set(dataContract.map((item) => item.matricula))
              ).map((matricula) => ({
                text: matricula,
                value: matricula,
              }))
            : [],
            onFilter: (value, record) =>
              record.matricula.toLowerCase().includes(value.toLowerCase()),
            align: "center",
          },
          {
            title: t("mainContent.table.mark"),
            dataIndex: "marca",
            key: "marca",
            filters: dataContract
            ? Array.from(
                new Set(dataContract.map((item) => item.marca))
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
            filters: dataContract
            ? Array.from(
                new Set(dataContract.map((item) => item.modelo))
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
            title: t("mainContent.table.methodPayment"),
            dataIndex: "forma de pago",
            key: "forma de pago",
            filters: dataContract
            ? Array.from(
                new Set(dataContract.map((item) => item['forma de pago']))
              ).map((formapago) => ({
                text: formapago,
                value: formapago,
              }))
            : [],
            onFilter: (value, record) =>
              record.formapago.toLowerCase().includes(value.toLowerCase()),
            align: "center",
          },
          {
            title: t("mainContent.table.startContract"),
            dataIndex: "fecha de inicio",
            key: "Fecha de inicio",
            align: "center",
          },
          {
            title: t("mainContent.table.endContract"),
            dataIndex: "fechaFin",
            key: "fecha de fin",
            align: "center",
          },
          {
            title: t("mainContent.table.extension"),
            dataIndex: "prorroga",
            key: "prorroga",
            align: "center",
          },
          {
            title: t("mainContent.table.additionalInsurance"),
            dataIndex: "seguro adicional",
            key: "seguro adicional",
            align: "center",
          },
          {
            title: t("mainContent.table.totalAmount"),
            dataIndex: "importe total",
            key: "importe total",
            align: "center",
          },
          {
            title: t("mainContent.table.actions"),
            key: "acciones",
            align: "center",
            render: (_, record) => (
              <Flex align="center" justify="center" gap="1rem">
                <Button
                  className="actionTable"
                  type="primary"
                  onClick={() => {
                    setVisible(true);
                    setRow(record);
                  }}
                  icon={<EditOutlined />}
                />
                <Button
                  onClick={() => {
                    setOpen(true);
                    setRow(record);
                  }}
                  className="actionTable"
                  type="primary"
                  icon={<DeleteOutlined />}
                />
              </Flex>
            ),
            fixed: "right",
            width: "13rem",
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

export default ListadoContratos;
