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
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import axios from "axios";
import EliminarContrato from "../../../components/EliminarContrato";
import ModalModContract from "../../../components/ModalModContract";
import { GlobalContext } from "../../../context/GlobalContext";
import DocumentPDF from "../../../components/DocumentPDF";
import { pdf } from "@react-pdf/renderer";

const extractDataContract = async () => {
  let dataSource = [];
  let response = null;

  const jwt = JSON.parse(sessionStorage.getItem('jwt'));
  try {
    response = await axios.get("http://localhost:3000/api/contract", {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });

    if (response.status === 200) {
      dataSource = response.data.map((element, index) => ({
        key: index,
        nombre: element.nombre,
        matricula: element.matricula,
        marca: element.marca,
        modelo: element.modelo,
        "forma de pago": element.formapago,
        "fecha de inicio": element.fechainicio,
        fechaFin: element.fechafin,
        prorroga: element.diasprorroga,
        "seguro adicional": element.seguro ? "Si" : "No",
        "importe total": element.importe,
      }));
    }
  } catch (error) {
    console.log(error);
  }
  return dataSource;
};

const downloadPDF = async (url) => {
  try {
    const jwt = JSON.parse(sessionStorage.getItem("jwt"));
    const response = await axios({
      url,
      method: "GET",
      responseType: "blob",
      headers: {
        "Content-Type": "application/pdf",
        'Authorization': `Bearer ${jwt}`,
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

const ListadoContratos = ({ url }) => {
  const [t] = useTranslation("global");
  const { setRow, user } = useContext(GlobalContext);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState();

  const onClick = async () => {
    await downloadPDF(url);
  };

  useEffect(() => {
    extractDataContract(user).then((result) => {
      setDataSource(result);
    })
    setDataSource(dataSource);
  }, [dataSource])

  return (
    <Flex vertical="true">
      <ModalModContract isOpen={visible} setOpen={() => setVisible(!visible)} dataContract={dataSource} setDataContract={setDataSource} />
      <EliminarContrato
        isOpen={open}
        setOpen={() => setOpen(!open)}
        setDataSource={setDataSource}
        dataSource={dataSource}
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
        dataSource={dataSource}
        columns={[
          {
            title: t("mainContent.table.name"),
            dataIndex: "nombre",
            key: "nombre",
            filters: dataSource
              ? Array.from(
                  new Set(dataSource.map((item) => item.nombre))
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
            filters: dataSource
              ? Array.from(
                  new Set(dataSource.map((item) => item.matricula))
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
            filters: dataSource
              ? Array.from(new Set(dataSource.map((item) => item.marca))).map(
                  (marca) => ({
                    text: marca,
                    value: marca,
                  })
                )
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
            title: t("mainContent.table.methodPayment"),
            dataIndex: "forma de pago",
            key: "forma de pago",
            filters: dataSource
              ? Array.from(
                  new Set(dataSource.map((item) => item["forma de pago"]))
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
