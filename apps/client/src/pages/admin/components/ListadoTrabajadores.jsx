import { Space, Flex, Typography, Table, Button, Input, Mentions } from "antd";
import { useContext, useEffect, useState } from "react";
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import EliminarWorker from '../../..//components/EliminarWorker';
import "../../../App.css";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ModalCreateWorker from "../../../components/ModalCreateWorker";
import { GlobalContext } from "../../../context/GlobalContext";

const extractDataWorker = async (user) => {
  let dataSource = [];
  let response = null;
  try {
    const jwt = JSON.parse(sessionStorage.getItem("jwt"));
    response = await axios.get('http://localhost:3000/api/user/worker', {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });

    if (response.status === 200) {
      dataSource = response.data.map((element, index) => ({
        key: index,
        usuario: element.nombre_usuario,
        municipio: element.mun
      }));
    }
  } catch (error) {
    console.log(error);
  }
  return dataSource;
};

const ListadoTrabajadores = () => {

  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [t] = useTranslation("global");
  const [dataSource, setDataSource] = useState([]);

  const {setRow} = useContext(GlobalContext);

  useEffect(() => {
    extractDataWorker().then(result => {
      setDataSource(result);
    })
    setDataSource([...dataSource]);
  }, [dataSource])

  return (
    <Flex vertical="true">
      <Typography.Title level={3}>{t("worker.workerList")}</Typography.Title>
      <ModalCreateWorker isOpen={visible} setOpen={() => setVisible(!visible)} setDataSource={setDataSource} dataSource={dataSource}/>
      <EliminarWorker isOpen={open} setOpen={() => setOpen(!open)} setDataSource={setDataSource} dataSource={dataSource}/>
      <Flex align="center" justify="flex-end"> 
        <Button onClick={() => setVisible(true)} className="actionTable" style={{marginBottom: "1rem", marginRight: "1rem"}} type="primary">{t("worker.addWorker")}</Button>
      </Flex>
      <Table 
      dataSource={dataSource}
      scroll={{
        x: 920,
      }}
        pagination={{
          pageSize: 5,
          position: ["bottomLeft"],
        }}
        columns={[
          {
            title: "Usuario",
            dataIndex: "usuario",
            key: "usuario",
            align: "center",
          },
          {
            title: "Municipio",
            dataIndex: "municipio",
            key: "municipio",
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
                    setOpen(true);
                    setRow(record);
                  }}
                  icon={<DeleteOutlined/>}
                />
              </Flex>
            ),
            fixed: "right",
            width: "13rem",
          },
        ]}
      ></Table>
    </Flex>
  );
};

export default ListadoTrabajadores;
