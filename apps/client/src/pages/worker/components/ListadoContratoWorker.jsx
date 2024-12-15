import { Space, Typography, Table, Flex, Button, notification } from "antd";
import { useState, useEffect, useContext } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import axios from "axios";
import EliminarContrato from "../../../components/EliminarContrato";
import ModalModContract from "../../../components/ModalModContract";
import { GlobalContext } from "../../../context/GlobalContext";
import { pdf } from "@react-pdf/renderer";
import DocumentPDF from "../../../components/DocumentPDF";
import ModalCreateContractWorker from "./ModalCreateContractWorker";


const extractDataContract = async (user) => {
    let dataSource = [];
    let response = null;
    try {
      const jwt = JSON.parse(sessionStorage.getItem("jwt"));
      response = await axios.get(`http://localhost:3000/api/contract/worker/${user?.mun}`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      console.log(response.data.data);
      if (response.status === 200) {
        dataSource = response.data.data.map((element, index) => ({
          key: index,
          nombre: element.nombre,
          matricula: element.matricula,
          marca: element.marca,
          modelo: element.modelo,
          "forma de pago": element.formapago,
          "fecha de inicio": element.fechainicio,
          fechaFin: element.fechafin,
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
    notification.info({
      message: "Descarga de PDF",
      description: 'La lista de Contratos esta vacia'
    });
  }
};

const ListadoContratosWorker = ({ url }) => {
  const [t] = useTranslation("global");
  const {setRow} = useContext(GlobalContext);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [visibleCreateContract, setVisibleCreateContract] = useState(false);
  const {user} = useContext(GlobalContext);
  const [dataSource, setDataSource] = useState();

  const onClick = async () => {
      await downloadPDF(url);
  };

  const handleRowClick = async (record) => {
    const blob = await pdf(<DocumentPDF dataContract={record} />).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  useEffect(() => {
    extractDataContract(user).then(result => {
      setDataSource(result);
      console.log(result);
    })
  }, [user])

  return (
    <Flex vertical="true">
      <ModalModContract isOpen={visible} setOpen={() => setVisible(!visible)}/>
      <EliminarContrato isOpen={open} setOpen={() => setOpen(!open)}/>
      <Typography.Title level={3}>{t("contract.contractList")}</Typography.Title>
      <Flex align="center" justify="flex-end">
        <Button
          onClickCapture={() => setVisibleCreateContract(true)}
          className="actionTable"
          style={{ marginBottom: "1rem", marginRight: "1rem" }}
          type="primary"
        >
          {t("mainContent.createContract")}
        </Button>
        <ModalCreateContractWorker
        isVisible={visibleCreateContract}
        setVisible={() => setVisibleCreateContract(!visibleCreateContract)}
        setDataContract={setDataSource}
        dataContract={dataSource}
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
        onRow={(record) => {
          return {
            onClick: (e) => handleRowClick(record),
          };
        }}
        dataSource={dataSource}
        columns={[
          {
            title: t("mainContent.table.name"),
            dataIndex: "nombre",
            key: "nombre",
            fixed: "left",
            width: "8rem",
          },
          {
            title: t("mainContent.table.serialNumber"),
            dataIndex: "matricula",
            key: "matricula",
          },
          {
            title: t("mainContent.table.mark"),
            dataIndex: "marca",
            key: "marca",
          },
          {
            title: t("mainContent.table.model"),
            dataIndex: "modelo",
            key: "modelo",
          },
          {
            title: t("mainContent.table.methodPayment"),
            dataIndex: "forma de pago",
            key: "forma de pago",
          },
          {
            title: t("mainContent.table.startContract"),
            dataIndex: "fecha de inicio",
            key: "Fecha de inicio",
          },
          {
            title: t("mainContent.table.endContract"),
            dataIndex: "fechaFin",
            key: "fecha de fin",
          },
          {
            title: t("mainContent.table.extension"),
            dataIndex: "prorroga",
            key: "prorroga",
          },
          {
            title: t("mainContent.table.additionalInsurance"),
            dataIndex: "seguro adicional",
            key: "seguro adicional",
          },
          {
            title: t("mainContent.table.totalAmount"),
            dataIndex: "importe total",
            key: "importe total",
          },
          {
            title: t("mainContent.table.actions"),
            key: "acciones",
            render: (_, record) => (
              <Flex align="center" justify="center" gap="1rem">
                <Button className="actionTable" type="primary" onClick={() => {setVisible(true); setRow(record)}}>
                  {t("mainContent.table.modify")}
                </Button>
                <Button onClick={() => {setOpen(true); setRow(record)}} className="actionTable" type="primary">
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

export default ListadoContratosWorker;
