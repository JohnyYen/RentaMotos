import {
  Mentions,
  Typography,
  Table,
  Flex,
  Button,
  message,
  List,
  Card,
} from "antd";
import "../App.css";
import axios from "axios";
import { DeleteOutlined, DownloadOutlined, EditOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ModalModMoto from "./ModalModMoto";
import { GlobalContext } from "../context/GlobalContext";
import ModalCreateMoto from "./ModalCreateMoto";
import EliminarMoto from "./EliminarMoto";
import moment from "moment";

const jwt = JSON.parse(sessionStorage.getItem('jwt'))

const extractData = async () => {
  let dataSource = [];
  let response = null;
  try {
    const jwt = JSON.parse(sessionStorage.getItem("jwt"));
    response = await axios.get("http://localhost:3000/api/moto", 
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        }
      }
    );
    
    if (response.status === 200) {
     
      dataSource = response.data.map((element, index) => ({
        key: index,
        matricula: element.matricula,
        marca: element.marca,
        modelo: element.modelo,
        situacion: element.situacion,
        color: element.color,
        kmRecorridos: element.cantkm,
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
      },
    });

    const urlObject = URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = urlObject;
    link.download = "ReporteMoto.pdf";
    link.click();

    URL.revokeObjectURL(urlObject);
  } catch (error) {
    notification.info({
      message: "Descarga de PDF",
      description: "La lista de Motos esta vacia",
    });
  }
};

// const extractDataFilter = async () => {
//   let dataFilter = [];
//   try {
//     const jwt = JSON.parse(sessionStorage.getItem("jwt"));
//     const response = await axios.get("http://localhost:3000/api/moto/marc", 
//       {
//         headers: {
//           Authorization: `Bearer ${jwt}`,
//         }
//       });
//     if (response.status === 200) {
//       dataFilter = response.data;
//     }
//   } catch (error) {
//     console.log(error);
//   }
//   return dataFilter;
// };

const ListMoto = () => {
  const [dataSource, setDataSource] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [t] = useTranslation("global");
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [visualize, setVisualize] = useState(false);
  const { setRow } = useContext(GlobalContext);
  const [pageSize, setPageSize] = useState();

  // Función para actualizar el pageSize según el ancho de la ventana
  const updatePageSize = () => {
    const width = window.innerWidth;
    let columns; 
    if (width < 576) {
      columns = 1; // xs
    } else if (width < 768) {
      columns = 2; // sm
    } else if (width < 992) {
      columns = 2; // md
    } else if (width < 1200) {
      columns = 3; // lg
    } else {
      columns = 4; // xl y xxl
    }
    setPageSize(columns);
  };

  useEffect(() => {
    extractData().then((result) => {
      setDataSource(result);
    });
    
    window.addEventListener("resize", updatePageSize);
    updatePageSize();
  }, []);

  const onClick = async () => {
    try {
      await downloadPDF("http://localhost:3000/api/moto/pdf", 
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          }
        });
    } catch (error) {}
  };

  return (
    <Flex vertical="true">
      <Typography.Title level={3}>
        {t("motorcycle.motorcycleList")}
      </Typography.Title>
      <ModalModMoto isOpen={visible} setOpen={() => setVisible(!visible)} dataSource={dataSource} setDataSource={setDataSource}/>
      <ModalCreateMoto isVisible={open} setVisible={() => setOpen(!open)} dataSource={dataSource} setDataSource={setDataSource}/>
      <EliminarMoto
        isOpen={visualize}
        setOpen={() => setVisualize(!visualize)}
        setDataSource={setDataSource}
        dataSource={dataSource}
      />
      <Flex align="center" justify="space-between">
        <Flex align="center">
          <Typography.Text style={{ fontSize: "1rem", fontWeight: "500" }}>
            {t("mainContent.currentDate")}:
          </Typography.Text>
          <Mentions
            style={{ width: "8rem", fontSize: "1rem", fontWeight: "500" }}
            readOnly
            variant="borderless"
            defaultValue={moment().format("L")}
          />
        </Flex>
        <Button
          onClick={() => setOpen(true)}
          className="actionTable"
          style={{ marginRight: "1rem" }}
          type="primary"
        >
          Crear moto
        </Button>
      </Flex>
      {/* <Flex align="center" justify="center">
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 6,
          }}
          pagination={{
            position: "bottom",
            align: "center",
            pageSize: pageSize,
          }}
          size="large"
          dataSource={dataSource}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                key={item.key}
                style={{ width: 240 }}
                actions={[<EditOutlined onClick={() => {setVisible(true); setRow(record)}} />]}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
              >
                <Card.Meta
                  title={`Matricula: ${item.matricula}`}
                  description={`Marca: ${item.marca} | Modelo: ${item.modelo} | Situación: ${item.situacion} | Color: ${item.color} | Km: ${item.kmRecorridos}`}
                />
              </Card>
            </List.Item>
          )}
        />
      </Flex> */}
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
            fixed: "left",
            width: "8rem",
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
          },
          {
            title: t("mainContent.table.situation"),
            dataIndex: "situacion",
            key: "situacion",
            filters: dataSource
            ? Array.from(
                new Set(dataSource.map((item) => item.situacion))
              ).map((situacion) => ({
                text: situacion,
                value: situacion,
              }))
            : [],
            onFilter: (value, record) =>
              record.situacion.toLowerCase().includes(value.toLowerCase()),
          },
          {
            title: t("mainContent.table.color"),
            dataIndex: "color",
            key: "color",
            filters: dataSource
            ? Array.from(
                new Set(dataSource.map((item) => item.color))
              ).map((color) => ({
                text: color,
                value: color,
              }))
            : [],
            onFilter: (value, record) =>
              record.nombre.toLowerCase().includes(value.toLowerCase()),
          },
          {
            title: t("mainContent.table.kmTraveled"),
            dataIndex: "kmRecorridos",
            key: "Km recorridos",
          },
          {
            title: t("mainContent.table.actions"),
            key: "acciones",
            render: (_, record) => (
              <Flex align="center" justify="center" gap="1rem">
                <Button icon={<EditOutlined />} onClick={() => {setVisible(true); setRow(record)}} className="actionTable" type="primary" />
                <Button icon={<DeleteOutlined />} className="actionTable" type="primary" onClick={() => {setVisualize(true); setRow(record)}} />
              </Flex>
            ),
            fixed: "right",
            width: "13rem",
          },
        ]}
      />
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

export default ListMoto;
