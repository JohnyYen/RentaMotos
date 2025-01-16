import { Mentions, Typography, Table, Flex, Button, List, Card, Empty } from "antd";
import "../../../App.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GlobalContext } from "../../../context/GlobalContext";
import moment from "moment";
import { SmileOutlined } from "@ant-design/icons";
import ModalCreateContractClient from "./ModalCreateContractClient";

const extractData = async () => {
  let dataSource = [];
  let response = null;
  const jwt = JSON.parse(sessionStorage.getItem('jwt'));

  try {
    response = await axios.get("http://localhost:3000/api/moto/client", {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    });

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

// const extractDataFilter = async () => {
//   let dataFilter = [];
//   try {
//     const response = await axios.get("http://localhost:3000/api/moto/marc");
//     if (response.status === 200) {
//       dataFilter = response.data;
//     }
//   } catch (error) {
//     console.log(error);
//   }
//   return dataFilter;
// };

const ListMotoClient = () => {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [t] = useTranslation("global");
  const { setRow, row } = useContext(GlobalContext);
  const [pageSize, setPageSize] = useState();

  const handleRow = (record) => {
    setRow(record);
  };

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
    // extractDataFilter().then((result) => {
    //   setDataFilter(
    //     result.map((marca) => ({
    //       text: marca.nommarca,
    //       value: marca.nomarca,
    //     }))
    //   );
    // });
    window.addEventListener("resize", updatePageSize);
    updatePageSize();
  }, []);

  return (
    <Flex vertical="true" style={{height: '40rem'}}>
      <Typography.Title level={3}>
        {t("motorcycle.motorcycleList")}
      </Typography.Title>
      <ModalCreateContractClient
        isVisible={visible}
        setVisible={() => setVisible(!visible)}
        setDataSourceMoto = {setDataSource}
        dataSourceMoto = {dataSource}
      />
      <Flex align="center">
        <Typography.Text style={{ fontSize: "1rem", fontWeight: "500" }}>
          {t("mainContent.currentDate")}:
        </Typography.Text>
        <Mentions
          style={{ width: "8rem", fontSize: "1rem", fontWeight: "500" }}
          readOnly
          variant="borderless"
          defaultValue={moment().format("L")}
        ></Mentions>
      </Flex>
      <Flex align="center" justify="center" style={{height: '40rem'}}>
        {dataSource.length > 0 ? (
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
                  actions={[
                    <Button onClick={() => {setVisible(true); setRow(item);}} type="primary">Rentar</Button>
                  ]}
                  key={item.key}
                  style={{ width: 240, marginRight: '1rem' }}
                  cover={
                    <img
                      alt="example"
                      src="/src/assets/images/moto.png"
                    />
                  }
                >
                  <Card.Meta
                    title={`Matricula: ${item.matricula}`}
                    description={`Marca: ${item.marca} | Modelo: ${item.modelo} | Color: ${item.color} | Km: ${item['Km recorridos']}`}
                  />
                </Card>
              </List.Item>
            )}
          />
        ) : (
          <Empty style={{position: "fixed", bottom: "30%"}}
          image={<SmileOutlined style={{ fontSize: '64px', color: '#1890ff' }} />}
          description={
            <Flex vertical="true">
              <Typography.Title level={4} style={{ fontWeight: 'bold', color: '#555' }}>
                ¡Ups! No hay motos disponibles.
              </Typography.Title>
              <Typography.Text style={{ color: '#777' }}>
                Parece que no tenemos ninguna moto en este momento.
              </Typography.Text>
            </Flex>
          }
        />
        )}
      </Flex>

      {/* <Table
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
      /> */}
    </Flex>
  );
};

export default ListMotoClient;
