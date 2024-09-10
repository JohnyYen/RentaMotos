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
    console.log

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
    
    const urlObject = URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = urlObject;
    link.download = 'ReporteContratos.pdf';
    link.click();
    
    URL.revokeObjectURL(urlObject);
  } catch (error) {
    console.log(error);
  }
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

  const onClick = async () => {
    await downloadPDF("http://localhost:3000/api/contract/pdf");
  };

  return (
    <Flex vertical="true">
      <Typography.Title level={3}>{t("contract.contractList")}</Typography.Title>
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
            title: "Nombre",
            dataIndex: "nombre",
            key: "nombre",
            fixed: "left",
            width: "8rem",
          },
          {
            title: "Matricula",
            dataIndex: "matricula",
            key: "matricula",
          },
          {
            title: "Marca",
            dataIndex: "marca",
            key: "marca",
          },
          {
            title: "modelo",
            dataIndex: "modelo",
            key: "modelo",
          },
          {
            title: "Forma de pago",
            dataIndex: "forma de pago",
            key: "forma de pago",
          },
          {
            title: "Fecha de inicio",
            dataIndex: "fecha de inicio",
            key: "Fecha de inicio",
          },
          {
            title: "Fecha de fin",
            dataIndex: "fecha de fin",
            key: "fecha de fin",
          },
          {
            title: "Prórroga",
            dataIndex: "prorroga",
            key: "prorroga",
          },
          {
            title: "Seguro adicional",
            dataIndex: "seguro adicional",
            key: "seguro adicional",
          },
          {
            title: "Importe total",
            dataIndex: "importe total",
            key: "importe total",
          }
        ]}
      ></Table>
    </Flex>
  );
};

export default ListadoContratos;
