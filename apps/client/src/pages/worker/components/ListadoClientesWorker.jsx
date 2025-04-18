import {
  Space,
  Flex,
  Typography,
  Table,
  Button,
  Input,
  Mentions,
  notification,
} from "antd";
import { useContext, useEffect, useState } from "react";
import {
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "../../../App.css";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ModalModClient from "../../../components/ModalModClient";
import { GlobalContext } from "../../../context/GlobalContext";
import EliminarUsuario from "../../../components/EliminarUsuario";

const extractDataClient = async (user) => {
  let dataSource = [];
  let response = null;
  console.log(user);
  try {
    const jwt = JSON.parse(sessionStorage.getItem("jwt"));
    response = await axios.get(
      `http://localhost:3000/api/client/mun/${user?.mun}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (response.status === 200) {
      dataSource = response.data.map((element, index) => ({
        key: index,
        municipio: element.municipio,
        nombre: element.nombre,
        ci: element.idcliente,
        "veces alquiladas": element.cant_alquileres,
        "valor alquileres": element.valor_total,
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
      method: "GET",
      responseType: "blob",
      headers: {
        "Content-Type": "application/pdf",
        Authorization: `Bearer ${jwt}`,
      },
    });

    const urlObject = URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = urlObject;
    link.download = "Clientes.pdf";
    link.click();

    // Limpiar el objeto URL creado
    URL.revokeObjectURL(urlObject);
  } catch (error) {
    notification.info({
      message: "Descarga de PDF",
      description: "La lista de Contratos esta vacia",
    });
  }
};

const ListadoClientesWorker = ({ data, url }) => {
  const { setRow, user } = useContext(GlobalContext);

  const [t] = useTranslation("global");

  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [extractData, setDataClient] = useState([]);

  useEffect(() => {
    extractDataClient(user).then((result) => {
      setDataClient(result);
    });
  }, [user]);

  const onClick = async () => {
    try {
      await downloadPDF(url);
    } catch (error) {}
  };

  return (
    <Flex vertical="true">
      <Typography.Title level={3}>
        {t("client.clientListTitle")}
      </Typography.Title>
      <ModalModClient isOpen={visible} setOpen={() => setVisible(!visible)} />
      <EliminarUsuario isOpen={open} setOpen={() => setOpen(!open)} />
      <Flex align="center">
        <Typography.Text style={{ fontSize: "1rem", fontWeight: "500" }}>
          {t("mainContent.currentDate")}:
        </Typography.Text>
        <Mentions
          style={{ width: "20rem", fontSize: "1rem", fontWeight: "500" }}
          readOnly
          variant="borderless"
          defaultValue={new Date().toUTCString()}
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
        dataSource={extractData}
        columns={[
          {
            title: t("mainContent.table.municipality"),
            dataIndex: "municipio",
            key: "municipio",
            fixed: "left",
            align: "center",
          },
          {
            title: t("mainContent.table.name"),
            dataIndex: "nombre",
            key: "nombre",
            filters: extractData
              ? Array.from(new Set(extractData.map((item) => item.nombre))).map(
                  (nombre) => ({
                    text: nombre,
                    value: nombre,
                  })
                )
              : [],
            onFilter: (value, record) =>
              record.nombre.toLowerCase().includes(value.toLowerCase()),
            align: "center",
          },
          {
            title: "CI",
            dataIndex: "ci",
            key: "ci",
            filters: extractData
              ? Array.from(new Set(extractData.map((item) => item.ci))).map(
                  (ci) => ({
                    text: ci,
                    value: ci,
                  })
                )
              : [],
            onFilter: (value, record) => record.ci.toString().includes(value),
            align: "center",
          },
          {
            title: t("mainContent.table.timesRented"),
            dataIndex: "veces alquiladas",
            key: "veces alquiladas",
            align: "center",
          },
          {
            title: t("mainContent.table.rentalValue"),
            dataIndex: "valor alquileres",
            key: "valor alquileres",
            align: "center",
          },
          {
            title: t("mainContent.table.actions"),
            key: "acciones",
            align: "center",
            render: (_, record) => (
              <Flex align="center" justify="center" gap="1rem">
                <Button
                  onClick={() => {
                    setVisible(true);
                    setRow(record);
                  }}
                  className="actionTable"
                  type="primary"
                  icon={<EditOutlined />}
                />
                <Button
                  className="actionTable"
                  type="primary"
                  onClick={() => {
                    setOpen(true);
                    setRow(record);
                  }}
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

export default ListadoClientesWorker;
