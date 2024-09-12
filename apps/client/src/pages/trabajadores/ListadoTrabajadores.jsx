import { Space, Flex, Typography, Table, Button, Input, Mentions } from "antd";
import { useEffect, useState } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import "../../App.css";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ModalCreateWorker from "../../components/ModalCreateWorker"

const extractDataWorker = async (user) => {
  let dataSource = [];
  let response = null;
  try {
    response = await axios.get(`http://localhost:3000/api/contract/worker/${user?.mun}`);

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
        "seguro adicional": element.seguro  ? "✔" : "❌",
        "importe total": element.importe,
      }));
    }
  } catch (error) {
    console.log(error);
  }
  return dataSource;
};

const ListadoTrabajadores = () => {

  const [visible, setVisible] = useState(false);
  const [t] = useTranslation("global");
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    extractDataWorker().then(result => {
      setDataSource(result);
    })
  }, [])

  return (
    <Flex vertical="true">
      <Typography.Title level={3}>Listado Trabajadores</Typography.Title>
      <ModalCreateWorker isOpen={visible} setOpen={() => setVisible(!visible)}/>
      <Flex align="center" justify="flex-end"> 
        <Button onClick={() => setVisible(true)} className="actionTable" style={{marginBottom: "1rem", marginRight: "1rem"}} type="primary">Agregar trabajador</Button>
      </Flex>
      <Table 
      dataSource={dataSource}
        scroll={{
          x: 650,
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
          },
          {
            title: "Contraseña",
            dataIndex: "contraseña",
            key: "contraseña",
          },
          {
            title: "Municipio",
            dataIndex: "municipio",
            key: "municipio",
          },
          {
            title: t("mainContent.table.actions"),
            key: "acciones",
            render: (_, record) => (
              <Flex align="center" justify="center" gap="1rem">
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
    </Flex>
  );
};

export default ListadoTrabajadores;
