import { Mentions, Button, Typography, Table, Flex } from "antd";
import { useState, useEffect } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import axios from "axios";

const IngresosAnno = ({ extractData }) => {
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  const currentDate = `${day}/${month}/${year}`;
  
  const [dataSource, setDataSource] = useState([]);
  const [t] = useTranslation("global");


  useEffect(() => {
    extractData().then((result) => {
      setDataSource(result);
    })
  }, [])

  return (
    <Flex vertical="true">
      <Typography.Title level={3}>{t("sideBar.annualIncome")}</Typography.Title>
      <Flex align="center">
        <Typography.Text style={{fontSize: "1rem", fontWeight: "500"}}>{t("mainContent.currentDate")}:</Typography.Text>
        <Mentions style={{width: "6rem", fontSize: "1rem", fontWeight: "500"}} readOnly variant="borderless" defaultValue={currentDate} />
      </Flex>
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
            title: t("mainContent."),
            dataIndex: "ingreso anual",
            key: "ingreso anual",
            fixed: "left"
          },
          {
            title: "Ingreso enero",
            dataIndex: "ingreso enero",
            key: "ingreso enero",
          },
          {
            title: "Ingreso febrero",
            dataIndex: "ingreso febrero",
            key: "ingreso febrero",
          },
          {
            title: "Ingreso marzo",
            dataIndex: "ingreso marzo",
            key: "ingreso marzo",
          },
          {
            title: "Ingreso abril",
            dataIndex: "ingreso abril",
            key: "ingreso abril",
          },
          {
            title: "Ingreso mayo",
            dataIndex: "ingreso mayo",
            key: "ingreso mayo",
          },
          {
            title: "Ingreso junio",
            dataIndex: "ingreso junio",
            key: "ingreso junio",
          },
          {
            title: "Ingreso julio",
            dataIndex: "ingreso julio",
            key: "ingreso julio",
          },
          {
            title: "Ingreso agosto",
            dataIndex: "ingreso agosto",
            key: "ingreso agosto",
          },
          {
            title: "Ingreso septiembre",
            dataIndex: "ingreso septiembre",
            key: "ingreso septiembre",
          },
          {
            title: "Ingreso octubre",
            dataIndex: "ingreso octubre",
            key: "ingreso octubre",
          },
          {
            title: "Ingreso noviembre",
            dataIndex: "ingreso noviembre",
            key: "ingreso noviembre",
          },
          {
            title: "Ingreso diciembre",
            dataIndex: "ingreso diciembre",
            key: "ingreso diciembre",
          },
        ]}
      ></Table>
      
      <Button className="ant-btn-download" type="primary" icon={<DownloadOutlined />} shape="round">Descargar PDF</Button>
    </Flex>
  );
};

export default IngresosAnno;
