import { Space, Typography, Table, Flex, Button } from "antd";
import { useState, useEffect, useContext } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import axios from "axios";
import EliminarContrato from "../../component/EliminarContrato";
import ModalModContract from "../../components/ModalModContract";
import { GlobalContext } from "../../context/GlobalContext";

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

const ListadoContratos = ({ extractData , url}) => {
  const [t] = useTranslation("global");
  const {setRow} = useContext(GlobalContext);
  const [visible, setVisible] = useState(false);

  const onClick = async () => {
    await downloadPDF(url);
  };

  return (
    <Flex vertical="true">
      <ModalModContract isOpen={visible} setOpen={() => setVisible(!visible)}/>
      <Typography.Title level={3}>{t("contract.contractList")}</Typography.Title>
      <Table
        scroll={{
          x: 1200,
        }}
        pagination={{
          pageSize: 5,
          position: ["bottomLeft"],
        }}
        dataSource={extractData}
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
            dataIndex: "fecha de fin",
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

export default ListadoContratos;
