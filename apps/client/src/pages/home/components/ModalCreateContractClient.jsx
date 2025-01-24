import { FolderOutlined } from "@ant-design/icons";
import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  message,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { GlobalContext, useRow } from "../../../context/GlobalContext";
import { useTranslation } from "react-i18next";

const jwt = JSON.parse(sessionStorage.getItem("jwt"));
const response = await axios.get(
  "http://localhost:3000/api/contract/formasPago",
  {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }
);

let dataSource = [];

if (response.status === 200) dataSource = response.data;

const ModalCreateContractClient = ({
  isVisible,
  setVisible,
  setDataSourceMoto,
  dataSourceMoto,
}) => {
  const [form] = Form.useForm();
  const { row, client } = useContext(GlobalContext);
  const margin = 15;
  const [dateFirm, setDateFirm] = useState("");
  const [dateEnd, setDateEnd] = useState(null);
  const [dateBegin, setDateBegin] = useState("");
  const [formaPago, setFormaPago] = useState("");
  const [seguro, setSeguro] = useState(false);
  const [t] = useTranslation("global");
  // const [signatureURL, setSignatureURL] = useState();

  const handlePetition = async () => {
    const contract = {
      idCliente: client.idcliente,
      matricula: row?.matricula,
      beginDate: dateBegin,
      endDate: dateEnd,
      firmaDate: dateFirm,
      formaPago: formaPago,
      seguro: seguro,
      diasProrroga: 0,
    };

    console.log(client);
    if (dateBegin && dateEnd && dateFirm && formaPago) {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/contract/",
          contract,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        
        if (res.status === 201) {
          setDataSourceMoto(dataSourceMoto.filter(moto => moto.matricula !== row?.matricula));
          message.success(t("messageSuccess"));
          setVisible(false);
        }
      } catch (error) {
        console.log(error);
        message.error(error.message);
      }
    }
  };
  return (
    <Modal
      okButtonProps={{ htmlType: "submit" }}
      afterClose={() => form.resetFields()}
      destroyOnClose={true}
      centered={true}
      open={isVisible}
      onCancel={setVisible}
      title={t("modal.rentMotorcycle")}
      onOk={handlePetition}
      modalRender={(dom) => (
        <Form
          form={form}
          labelCol={{ span: 16 }}
          wrapperCol={{ span: 24 }}
          autoComplete="off"
          initialValues={{ remember: false }}
          layout="vertical"
        >
          {dom}
        </Form>
      )}
    >
      <Row gutter={16}>
        <Col span={12}>
          {/* <Input value={row?.matricula} onChange={(e) => setMatricula(e.target.value)} style={{marginBottom:margin, marginTop: 10}} placeholder='Matricula de la Moto'/>

            <Input value={client?.idcliente} onChange={(e) => setCI(e.target.value)} style={{marginBottom:margin}}  placeholder='CI Cliente'/> */}

          <Form.Item
            label={t("modal.signatureDate") + ":"}
            name="dateFirma"
            rules={[
              { required: true, message: t("messageError.emptySignatureDate") },
              {
                validator: (rule, value, callback) => {
                  if (rule && value) {
                    if (dateBegin && value.format("YYYY-MM-DD") > dateBegin)
                      callback(
                        new Error(
                          t("messageError.signatureDateBeforeStartDate")
                        )
                      );
                    if (dateEnd && value.format("YYYY-MM-DD") > dateEnd)
                      callback(
                        new Error(t("messageError.signatureDateBeforeEndDate"))
                      );
                  }
                },
              },
            ]}
            dependencies={["dateBegin", "dateEnd"]}
          >
            <DatePicker
              placement="bottomLeft"
              format={"YYYY-MM-DD"}
              onChange={(value) => setDateFirm(value.format("YYYY-MM-DD"))}
              style={{ marginBottom: margin }}
              placeholder={t("modal.signatureDate")}
            />
          </Form.Item>

          <Form.Item
            label={t("modal.startDate") + ":"}
            name="dateBegin"
            rules={[
              { required: true, message: t("messageError.emptyStartDate") },
              {
                validator: (rule, value, callback) => {
                  if (rule && value) {
                    if (dateFirm && dateFirm > value.format("YYYY-MM-DD"))
                      callback(
                        new Error(
                          t("messageError.signatureDateBeforeStartDate")
                        )
                      );
                    if (dateEnd && value.format("YYYY-MM-DD") > dateEnd)
                      callback(
                        new Error(t("messageError.startDateBeforeEndDate"))
                      );
                  }
                },
              },
            ]}
            dependencies={["dateFirm", "dateEnd"]}
          >
            <DatePicker
              placement="bottomLeft"
              format={"YYYY-MM-DD"}
              onChange={(value) => setDateBegin(value.format("YYYY-MM-DD"))}
              style={{ marginBottom: margin }}
              placeholder={t("modal.startDate")}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label={t("modal.endDate") + ":"}
            name="dateEnd"
            rules={[
              { required: true, message: t("messageError.emptyEndDate") },
              {
                validator: (rule, value, callback) => {
                  if (rule && value) {
                    const end = value.format("YYYY-MM-DD");
                    if (dateFirm && dateFirm > end)
                      callback(
                        new Error(
                          t("messageError.signatureDateBeforeStartDate")
                        )
                      );
                    if (dateEnd && dateBegin > value.format("YYYY-MM-DD"))
                      callback(
                        new Error(t("messageError.startDateBeforeEndDate"))
                      );
                  }
                },
              },
            ]}
            dependencies={["dateBegin", "dateFirm"]}
          >
            <DatePicker
              format={"YYYY-MM-DD"}
              onChange={(value) => setDateEnd(value.format("YYYY-MM-DD"))}
              style={{ marginBottom: margin }}
              placeholder={t("modal.endDate")}
            />
          </Form.Item>

          <Form.Item
            label={t("modal.methodPayment") + ":"}
            name="formaPago"
            rules={[
              { required: true, message: t("messageError.emptyMethodPayment") },
            ]}
          >
            <Select
              onSelect={(value, _) => setFormaPago(value)}
              style={{ marginBottom: margin, width: 150 }}
              placeholder={t("modal.methodPayment")}
            >
              {dataSource.map((item, i) => (
                <Select.Option key={i} value={item.forma_pago}>
                  {item.forma_Pago}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="seguro" rules={[]}>
            <Typography.Paragraph>
              {t("modal.insurance")}
              <Checkbox
                onChange={(e) => setSeguro(e.target.checked)}
              />{" "}
            </Typography.Paragraph>
          </Form.Item>
        </Col>
      </Row>

      {/* <Form.Item label={t("modal.signature") + ":"}>
        <SignaturePad setSignatureURL={setSignatureURL} />
      </Form.Item> */}

    </Modal>
  );
};

export default ModalCreateContractClient;
