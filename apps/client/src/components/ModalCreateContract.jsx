import { FolderOutlined } from "@ant-design/icons";
import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useTranslation } from "react-i18next";
import ModalCreateClient from "./ModalCreateClient";
import SignaturePad from "./SignaturePad";

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
console.log(dataSource)

let marcData = [];
let modelData = [];

let responseMarcData = await axios.get('http://localhost:3000/api/moto/marc', {
  headers: {
    Authorization: `Bearer ${jwt}`
  }
});
console.log(responseMarcData);
if(responseMarcData === 200) marcData = responseMarcData.data;

const modelResponse = await axios.get("http://localhost:3000/api/moto/model", {
  headers: {
    Authorization: `Bearer ${jwt}`,
  },
});
if (modelResponse.status === 200) modelData = modelResponse.data;

const ModalCreateContractWorker = ({
  isVisible,
  setVisible,
  setDataContract,
  dataContract,
}) => {
  const [form] = Form.useForm();
  const { row, client } = useContext(GlobalContext);
  const [visibleModalCreateClient, setVisibleModalCreateCliente] =
    useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const margin = 15;
  const [dateFirm, setDateFirm] = useState("");
  const [dateEnd, setDateEnd] = useState(null);
  const [dateBegin, setDateBegin] = useState("");
  const [formaPago, setFormaPago] = useState("");
  const [seguro, setSeguro] = useState(false);
  const [prorroga, setProrroga] = useState(0);
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [items, setItems] = useState([]);
  const [clientIdCard, setClientIdCard] = useState("");
  const [clientCreated, setClientCreated] = useState(false);
  const [t] = useTranslation("global");
  const [signatureURL, setSignatureURL] = useState();

  const showMotoNotFoundWarning = () => {
    messageApi.warning({
      content: `No se encontraron motos disponibles con la marca "${marca}" y el modelo "${modelo}".`,
      duration: 5,
    });
  };

  const changeModel = (value) => {
    setMarca(value);
    setItems(modelData.filter((item) => item.nom_marca === value));
  };

  const handlePetition = async () => {
    try {
      const responseMotos = await axios.get("http://localhost:3000/api/moto", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log(responseMotos);
      const motoRequired = responseMotos.data.find(
        (moto) =>
          moto.situacion === "Disponible" &&
          moto.marca === marca &&
          moto.modelo === modelo
      );
      if (motoRequired === undefined) {
        showMotoNotFoundWarning();
      } else {
        const contract = {
          matricula: motoRequired.matricula,
          carnetCliente: client.idcliente,
          beginDate: dateBegin,
          endDate: dateEnd,
          firmaDate: dateFirm,
          formaPago: formaPago,
          seguro: seguro,
          diasProrroga: prorroga,
        };

        if (dateBegin && dateEnd && dateFirm && formaPago) {
          console.log(contract);
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
            message.success(t("messageSuccess"));
            setDataContract([
              ...dataContract,
              {
                key: dataContract[dataContract.length - 1]?.key + 1 || 1,
                nombre: idClientExist.data.data.nombre,
                matricula: motoRequired.matricula,
                marca: motoRequired.marca,
                modelo: motoRequired.modelo,
                "forma de pago": formaPago,
                "fecha de inicio": dateBegin,
                fechaFin: dateEnd,
                prorroga: prorroga,
                "seguro adicional": seguro ? "✔" : "❌",
              },
            ]);
            setVisible(false);
          }
        } else {
          message.error(t("messageError.incompleteForm"));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {contextHolder}
      <ModalCreateClient
        isVisible={visibleModalCreateClient}
        setVisible={() => {
          setVisibleModalCreateCliente(!visibleModalCreateClient);
        }}
        setClientCreated={setClientCreated}
      />
      <Modal
        okButtonProps={{ htmlType: "submit" }}
        afterClose={() => form.resetFields()}
        destroyOnClose={true}
        centered={true}
        open={isVisible}
        onCancel={() => setVisible(false)}
        title={t("modal.rentMotorcycle")}
        onOk={handlePetition}
        modalRender={(dom) => (
          <Form
            form={form}
            labelCol={{ span: 20 }}
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
          <Col span={8}>

            <Form.Item
              label={t("modal.signatureDate") + ":"}
              name="dateFirma"
              rules={[
                {
                  required: true,
                  message: t("messageError.emptySignatureDate"),
                },
              ]}
            >
              <DatePicker
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
              ]}
            >
              <DatePicker
                format={"YYYY-MM-DD"}
                onChange={(value) => setDateBegin(value.format("YYYY-MM-DD"))}
                style={{ marginBottom: margin }}
                placeholder={t("modal.startDate")}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
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
                onSelect={(value) => setFormaPago(value)}
                style={{ marginBottom: margin, width: 150 }}
                placeholder={t("modal.methodPayment")}
              >
                {dataSource.map((item, i) => (
                  <Select.Option key={i} value={item.forma_pago}>
                    {item.forma_pago}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            {/* <Form.Item label={t("modal.extensionDays") + ":"} name="prorroga">
              <Input
                type="number"
                onChange={(e) => setProrroga(e.target.value)}
                style={{ marginBottom: margin }}
                placeholder={t("modal.extensionDays")}
              />
            </Form.Item> */}

            <Form.Item
              label={t("modal.endDate") + ":"}
              name="dateEnd"
              rules={[
                { required: true, message: t("messageError.emptyEndDate") },
              ]}
            >
              <DatePicker
                format={"YYYY-MM-DD"}
                onChange={(value) => setDateEnd(value.format("YYYY-MM-DD"))}
                style={{ marginBottom: margin }}
                placeholder={t("modal.endDate")}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label={t("mainContent.table.mark") + ":"}
              name="marca"
              rules={[{ required: true, message: t("messageError.emptyMark") }]}
            >
              <Select
                onSelect={(value) => changeModel(value)}
                style={{ marginBottom: margin, width: 150 }}
                placeholder={t("mainContent.table.mark")}
              >
                {responseMarcData.data.map((item, i) => (
                  <Select.Option key={i} value={item.nom_marca}>
                    {item.nom_marca}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label={t("mainContent.table.model") + ":"}
              name="modelo"
              rules={[
                { required: true, message: t("messageError.emptyModel") },
              ]}
            >
              <Select
                onChange={(value) => setModelo(value)}
                style={{ marginBottom: margin, width: 150 }}
                placeholder={t("mainContent.table.model")}
              >
                {items.map((item, i) => (
                  <Select.Option key={i} value={item.nom_modelo}>
                    {item.nom_modelo}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="seguro" style={{marginTop: 55}}> 
              <Typography.Paragraph>
                {t("modal.insurance")}{" "}
                <Checkbox
                  onChange={(e) => setSeguro(e.target.checked)}
                  style={{ marginBottom: margin }}
                />
              </Typography.Paragraph>
            </Form.Item>
          </Col>
        
  
        
        </Row>
      </Modal>
    </>
  );
};

export default ModalCreateContractWorker;
