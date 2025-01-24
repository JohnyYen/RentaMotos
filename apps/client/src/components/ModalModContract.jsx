import {
  Checkbox,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Tag,
  Typography,
} from "antd";
import { Option } from "antd/es/mentions";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useTranslation } from "react-i18next";
import { SyncOutlined, UserOutlined } from "@ant-design/icons";
import dayjs from "moment";
import { LuBike } from "react-icons/lu";

const response = await axios.get(
  "http://localhost:3000/api/contract/formasPago"
);
let dataSource = [];

if (response.status === 200) dataSource = response.data;

const ModalModContract = ({
  isOpen,
  setOpen,
  dataContract,
  setDataContract,
}) => {
  const [form] = Form.useForm();
  const { row } = useContext(GlobalContext);
  const [ci, setCi] = useState("");
  const [Matricula, setMatricula] = useState("");
  const [formaPago, setFormaPago] = useState("");
  const r = row ? row["seguro adicional"] === "✔" : true;
  const [seguro, setSeguro] = useState(r);
  //console.log(a);
  const [diasProrroga, setDiasProrroga] = useState(0);
  const [date, setDate] = useState("");
  const [t] = useTranslation("global");


  
  const margin = 0;
  console.log(row)
  useEffect(() => {
    if (row) {
      setDiasProrroga(row.prorroga || 0);
      setFormaPago(row["forma de pago"] || '');
      setDate(row["fecha de fin"] || '');
      setSeguro(r || !r);
    }
  }, [row]);

  const handlePetition = async () => {
    const contract = {
      idCliente: row?.nombre,
      matricula: row?.matricula,
      beginDate: row ? row["fecha de inicio"] : null,
      endDate: date,
      firmaDate: "2024-03-04",
      formaPago: formaPago,
      seguro: seguro,
      diasProrroga: diasProrroga,
    };

    if (date) {
      console.log('llego a la peti')
      const jwt = JSON.parse(sessionStorage.getItem('jwt'))
      const res = await axios.patch(
        `http://localhost:3000/api/contract/${row?.matricula}`,
        contract , {headers:{'Authorization': `Bearer ${jwt}`} }
      );
     
      if (res.status === 200) {
        const index = dataContract.findIndex(
          (item) => item.matricula === contract.matricula
        );
        dataContract[index] = { ...dataContract[index], ...contract };

        setDataContract([...dataContract]);
        message.info("Se ha modificado con exito");
        setOpen(false);
      }
    }
  };
  return (
    <Modal
      okButtonProps={{ htmlType: "submit" }}
      afterClose={() => form.resetFields()}
      afterOpenChange={() => setSeguro(seguro)}
      destroyOnClose={true}
      title={t("modal.modifyContract")}
      open={isOpen}
      onOk={handlePetition}
      onCancel={setOpen}
      onClose={setOpen}
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
      <Flex vertical={true}>
        <Row gutter={24}>
          <Col span={12}>
            <Tag
              icon={<UserOutlined />}
              style={{ margin: 15, width: 150, height: 30 }}
            >
              <Typography.Text>{row?.nombre}</Typography.Text>
            </Tag>

            <Tag style={{ margin: 15, width: 150, height: 30 }}>
              <Typography.Text>{row?.matricula}</Typography.Text>
            </Tag>

            <Form.Item
              label={t("modal.methodPayment") + ":"}
              name="formaPago"
              rules={[
                {
                  required: true,
                  message: t("messageError.emptyMethodPayment"),
                },
              ]}
            >
              <Select
                style={{ marginBottom: margin }}
                onSelect={(e) => setFormaPago(e)}
                placeholder={
                  row ? row["forma de pago"] : t("modal.methodPayment")
                }
              >
                {dataSource.map((item, i) => (
                  <Select.Option key={i} value={item.forma_pago}>
                    {item.forma_pago}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="seguro" rules={[]}>
              <Checkbox
              defaultChecked={!r}
                title={t("modal.insurance") + ":"}
                style={{ marginBottom: margin }}
                onChange={(e) => setSeguro(e.target.checked)}
              >
                {t("modal.methodPayment") + ":"}
              </Checkbox>
            </Form.Item>

            <Form.Item
              label={t("modal.extensionDays") + ":"}
              name="diasProrroga"
              rules={[
                {
                  required: true,
                  message: t("messageError.emptyExtensionDays"),
                },
              ]}
            >
              <InputNumber
                value={row?.prorroga}
                min={row?.prorroga}
                style={{ marginBottom: margin, width: 150 }}
                onChange={(e) => setDiasProrroga(e)}
                placeholder={row ? row["prorroga"] : t("modal.methodPayment")}
              />
            </Form.Item>

            <Form.Item
              label="Fecha de Fin:"
              name="dateEnd"
              rules={[
                { required: true, message: "Introduce la fecha de Fin!" },
              ]}
            >
              <DatePicker
                value={row?.fechaFin}
                disabledDate={(date) => {
                  return date && date < new Date(row?.fechaFin);
                }}
                placement="bottomLeft"
                format={"YYYY-MM-DD"}
                placeholder="Fecha Fin"
                style={{ marginBottom: margin }}
                onChange={(date, dateString) => setDate(dateString)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Flex>
    </Modal>
    
  );
};

export default ModalModContract;
