import { Space, Flex, Typography, Table, Button, Input, Mentions } from "antd";
import { useEffect, useState } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import "../../App.css";
import axios from "axios";
import { useTranslation } from "react-i18next";

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
    link.download = 'Clientes.pdf';
    link.click();
    
    // Limpiar el objeto URL creado
    URL.revokeObjectURL(urlObject);
  } catch (error) {
    console.error('Error al descargar el archivo:', error);
  }
};

const extractDataFilter = async () => {
  let dataFilter = [];
  try {
     const response = await axios.get('http://localhost:3000/api/mun');
    if(response.status === 200){
      dataFilter = response.data
    }
  } catch (error) {
    console.log(error);
  }
  return dataFilter;
};

const ListadoClientes = ({ extractData }) => {
  const [dataSource, setDataSource] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [t] = useTranslation("global");

  useEffect(() => {
    extractData().then((result) => {
      setDataSource(result);
    }, []);

    extractDataFilter().then(result => {
      setDataFilter(result.map(municipio => (
        {
          text: municipio.nommun,
          value: municipio.nommun,
        }
      )));
    });
  }, []);

  const onClick = async () => {
    await downloadPDF('http://localhost:3000/api/client/pdf');
  };

  return (
    <Flex vertical="true">
      <Typography.Title level={3}>{t("client.clientListTitle")}</Typography.Title>
      <Flex align="center">
        <Typography.Text style={{ fontSize: "1rem", fontWeight: "500" }}>
          {t("mainContent.currentDate")}:
        </Typography.Text>
        <Mentions
          style={{ width: "6rem", fontSize: "1rem", fontWeight: "500" }}
          readOnly
          variant="borderless"
          defaultValue={dateToday}
        />
      </Flex>
      <Table
        scroll={{
          x: 920,
        }}
        pagination={{
          pageSize: 5,
          position: ["bottomLeft"],
        }}
        dataSource={dataSource}
        columns={[
          {
            title: t("mainContent.table.municipality"),
            dataIndex: "municipio",
            key: "municipio",
            fixed: "left",
            filters: dataFilter,
            onFilter: (value, record) => record.municipio.indexOf(value) === 0,
          },
          {
            title: t("mainContent.table.name"),
            dataIndex: "nombre",
            key: "nombre",
          },
          {
            title: "CI",
            dataIndex: "ci",
            key: "ci",
          },
          {
            title: t("mainContent.table.timesRented"),
            dataIndex: "veces alquiladas",
            key: "veces alquiladas",
          },
          {
            title: t("mainContent.table.rentalValue"),
            dataIndex: "valor alquileres",
            key: "valor alquileres",
          },
          {
            title: t("mainContent.table.actions"),
            key: "acciones",
            render: (_, record) => (
              <Flex align="center" justify="center" gap="1rem">
                <Button className="actionTable" type="primary">
                  {t("mainContent.table.modify")}
                </Button>
                <Button className="actionTable" type="primary">
                {t("mainContent.table.delete")}
                </Button>
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

export default ListadoClientes;
