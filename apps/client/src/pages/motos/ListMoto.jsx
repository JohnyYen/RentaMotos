import { Mentions, Typography, Table, Flex, Button } from "antd";
import "../../App.css";
import axios from "axios";
import { DownloadOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ModalModMoto from '../../components/ModalModMoto'
import {GlobalContext} from '../../context/GlobalContext'


const extractData = async () => {
  let dataSource = [];
  let response = null;
  try {
    response = await axios.get("http://localhost:3000/api/moto");

    if (response.status === 200) {
      dataSource = response.data.map((element, index) => ({
        key: index,
        matricula: element.matricula,
        marca: element.marca,
        modelo: element.modelo,
        color: element.color,
        "Km recorridos": element.cantkm,
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
    console.log(error);
  }
};

const extractDataFilter = async () => {
  let dataFilter = [];
  try {
     const response = await axios.get('http://localhost:3000/api/marc');
    if(response.status === 200){
      dataFilter = response.data
    }
  } catch (error) {
    console.log(error);
  }
  return dataFilter;
};

const ListMoto = () => {
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  const currentDate = `${day}/${month}/${year}`;

  const [dataSource, setDataSource] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [t] = useTranslation("global");
  const [visible, setVisible] = useState(false);
  const {setRow} = useContext(GlobalContext);

  useEffect(() => {
    extractData().then((result) => {
      setDataSource(result);
    });
    extractDataFilter().then(result => {
      setDataFilter(result.map(marca => (
        {
          text: marca.nommarca,
          value: marca.nomarca,
        }
      )));
    });
  }, []);

  const onClick = async () => {
    await downloadPDF("http://localhost:3000/api/moto/pdf");
  };

  return (
    <Flex vertical="true">
      <Typography.Title level={3}>{t("motorcycle.motorcycleList")}</Typography.Title>
      <ModalModMoto isOpen={visible} setOpen={() => setVisible(!visible)}/>
      <Flex align="center">
        <Typography.Text style={{ fontSize: "1rem", fontWeight: "500" }}>
          Fecha actual:
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
          pageSize: 5,
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
            filters: dataFilter,
            onFilter: (value, record) => record.marca.indexOf(value) === 0,
          },
          {
            title: t("mainContent.table.model"),
            dataIndex: "modelo",
            key: "modelo",
          },
          {
            title: t("mainContent.table.color"),
            dataIndex: "color",
            key: "color",
          },
          {
            title: t("mainContent.table.kmTraveled"),
            dataIndex: "Km recorridos",
            key: "Km recorridos",
          },
          {
            title: t("mainContent.table.actions"),
            key: "acciones",
            render: (_, record) => (
              <Flex align="center" justify="center" gap="1rem">
                <Button onClick={() => {setVisible(true); setRow(record)}} className="actionTable" type="primary">
                  Modificar
                </Button>
                <Button className="actionTable" type="primary">
                  Eliminar
                </Button>
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

      )
};

export default ListMoto;
