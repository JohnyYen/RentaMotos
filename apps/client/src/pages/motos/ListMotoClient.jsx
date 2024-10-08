import { Mentions, Typography, Table, Flex, Button } from "antd";
import "../../App.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ModalCreateContract from "../../components/ModalCreateContract";
import { GlobalContext } from "../../context/GlobalContext";
import moment from "moment";

const extractData = async () => {

  let dataSource = [];
  let response = null;
  try {
    response = await axios.get("http://localhost:3000/api/moto/client");

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

const ListMotoClient = () => {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [t] = useTranslation("global");

  const {setRow, row} = useContext(GlobalContext);

  const handleRow = (record) => {
    setRow(record);
  }

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

  return (
    <Flex vertical="true">
      <Typography.Title level={3}>{t("motorcycle.motorcycleList")}</Typography.Title>
      <ModalCreateContract isVisible={visible} setVisible={() => setVisible(!visible)}/>
      <Flex align="center">
        <Typography.Text style={{ fontSize: "1rem", fontWeight: "500" }}>
        {t("mainContent.currentDate")}:
        </Typography.Text>
        <Mentions
          style={{ width: "8rem", fontSize: "1rem", fontWeight: "500" }}
          readOnly
          variant="borderless"
          defaultValue={moment().format('L')}
        ></Mentions>
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
                <Button onClick={() => {handleRow(record);setVisible(!visible);}} className="actionTable" type="primary">
                {t("mainContent.table.rent")}
                </Button>
               
              </Flex>
            ),
            fixed: "right",
            width: "13rem",
          },
        ]}
      />
    </Flex>

      )
};

export default ListMotoClient;
