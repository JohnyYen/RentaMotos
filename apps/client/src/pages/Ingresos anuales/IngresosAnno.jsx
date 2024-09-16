import { Mentions, Button, Typography, Table, Flex } from "antd";
import { useState, useEffect } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import axios from "axios";

const downloadPDF = async (url) => {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "blob",
      headers: {
        'Content-Type': 'application/pdf',
      },

    });
    console.log(response);

    const apiUrl = URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = apiUrl;
    link.download = "Ingreso anual.pdf";
    link.click();

    URL.revokeObjectURL(apiUrl);
  } catch (error) {
    console.log(error);
  }
};

const IngresosAnno = ({ extractData }) => {
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  const currentDate = `${day}/${month}/${year}`;
  
  const [t] = useTranslation("global");

  const onClick = async () => {
    await downloadPDF("http://localhost:3000/api/pagos/pdf");
  };

  return (
    <Flex vertical="true">
      <Typography.Title level={3}>{t("sideBar.annualIncome")}</Typography.Title>
      <Flex align="center">
        <Typography.Text style={{fontSize: "1rem", fontWeight: "500"}}>{t("mainContent.currentDate")}:</Typography.Text>
        <Mentions style={{width: "6rem", fontSize: "1rem", fontWeight: "500"}} readOnly variant="borderless" defaultValue={currentDate} />
      </Flex>
      <Table
      style={{width:1200, height:300}}
        dataSource={extractData}
        columns={[
          {
            title: t("mainContent.table.annualIncome"),
            dataIndex: "ingreso anual",
            key: "ingreso anual",
            fixed: "left"
          },
          {
            title: t("mainContent.table.income.january"),
            dataIndex: "ingreso enero",
            key: "ingreso enero",
          },
          {
            title: t("mainContent.table.income.february"),
            dataIndex: "ingreso febrero",
            key: "ingreso febrero",
          },
          {
            title: t("mainContent.table.income.march"),
            dataIndex: "ingreso marzo",
            key: "ingreso marzo",
          },
          {
            title: t("mainContent.table.income.april"),
            dataIndex: "ingreso abril",
            key: "ingreso abril",
          },
          {
            title: t("mainContent.table.income.may"),
            dataIndex: "ingreso mayo",
            key: "ingreso mayo",
          },
          {
            title: t("mainContent.table.income.june"),
            dataIndex: "ingreso junio",
            key: "ingreso junio",
          },
          {
            title: t("mainContent.table.income.july"),
            dataIndex: "ingreso julio",
            key: "ingreso julio",
          },
          {
            title: t("mainContent.table.income.august"),
            dataIndex: "ingreso agosto",
            key: "ingreso agosto",
          },
          {
            title: t("mainContent.table.income.september"),
            dataIndex: "ingreso septiembre",
            key: "ingreso septiembre",
          },
          {
            title: t("mainContent.table.income.october"),
            dataIndex: "ingreso octubre",
            key: "ingreso octubre",
          },
          {
            title: t("mainContent.table.income.november"),
            dataIndex: "ingreso noviembre",
            key: "ingreso noviembre",
          },
          {
            title: t("mainContent.table.income.december"),
            dataIndex: "ingreso diciembre",
            key: "ingreso diciembre",
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

export default IngresosAnno;
