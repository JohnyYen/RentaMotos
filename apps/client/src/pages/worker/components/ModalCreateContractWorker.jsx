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
import { GlobalContext } from "../../../context/GlobalContext";
import { useTranslation } from "react-i18next";
import ModalCreateClient from "../../../components/ModalCreateClient";

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

let marcData = [];
let modelData = [];

// responseMarcData = await axios.get('http://localhost:3000/api/moto/marc', {
//   headers: {
//     Authorization: `Bearer ${jwt}`
//   }
// });

// if(responseMarcData === 200) marcData = responseMarcData.data;

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
  const [visibleModalCreateClient, setVisibleModalCreateCliente] = useState(false);
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

  const showClientRegistrationWarning = () => {
    const modal = Modal.warning({
      title: "El cliente no se encuentra registrado.",
      content: (
        <div>
          <p>¿Desea registrarlo?</p>
        </div>
      ),
      okText: "Sí",
      cancelText: "No",
      onOk: () => {
        modal.destroy();
        setVisibleModalCreateCliente(true);
      },
      onCancel: () => {
        modal.destroy();
        setVisible(false);
      },
    });
  };

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

  const selectMotoContract = async ( idClientExist ) => {
    try {
      console.log('Entra al otro metodo');
      const responseMotos = await axios.get("http://localhost:3000/api/moto", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log(responseMotos);
      const motoRequired = responseMotos.data.data.find(
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
          carnetCliente: clientIdCard,
          beginDate: dateBegin,
          endDate: dateEnd,
          firmaDate: dateFirm,
          formaPago: formaPago,
          seguro: seguro,
          diasProrroga: prorroga,
        };

        if (dateBegin && dateEnd && dateFirm && formaPago) {
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

  const handlePetition = async () => {
    if (clientIdCard) {
      try {
        const idClientExist = await axios.get(`http://localhost:3000/api/client/sample/${clientIdCard}`, {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        console.log(idClientExist);
        if (idClientExist.status === 200 && idClientExist.data.count === 0) {
          showClientRegistrationWarning();
          console.log("entra al if");
          if (clientCreated) {
            selectMotoContract(idClientExist);
            console.log("entra al if 2");
          }
        } else {
          console.log("entra al else");
          selectMotoContract(idClientExist);
        }
      } catch (error) {}
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
            {/* Carnet del Cliente */}
            <Form.Item
              label={t("modal.clientIdCard") + ":"}
              name="carnetCliente"
              rules={[
                {
                  required: true,
                  message: t("messageError.emptyClientIdCard"),
                },
                {
                  pattern: /^[0-9]{11}$/,
                  message: t("messageError.invalidClientIdCard"),
                },
              ]}
            >
              <Input
                maxLength={11}
                onChange={(e) => setClientIdCard(e.target.value)}
                placeholder={t("modal.clientIdCard")}
                style={{ marginBottom: margin }}
              />
            </Form.Item>

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
                format={"DD/MM/YYYY"}
                onChange={(value) => setDateFirm(value.format("DD/MM/YYYY"))}
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
                format={"DD/MM/YYYY"}
                onChange={(value) => setDateBegin(value.format("DD/MM/YYYY"))}
                style={{ marginBottom: margin }}
                placeholder={t("modal.startDate")}
              />
            </Form.Item>

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
                  <Select.Option key={i} value={item.formapago}>
                    {item.formapago}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label={t("modal.extensionDays") + ":"} name="prorroga">
              <Input
                type="number"
                onChange={(e) => setProrroga(e.target.value)}
                style={{ marginBottom: margin }}
                placeholder={t("modal.extensionDays")}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={t("modal.endDate") + ":"}
              name="dateEnd"
              rules={[
                { required: true, message: t("messageError.emptyEndDate") },
              ]}
            >
              <DatePicker
                format={"DD/MM/YYYY"}
                onChange={(value) => setDateEnd(value.format("DD/MM/YYYY"))}
                style={{ marginBottom: margin }}
                placeholder={t("modal.endDate")}
              />
            </Form.Item>

            {/* <Form.Item
              label={t("mainContent.table.mark") + ":"}
              name="marca"
              rules={[{ required: true, message: t("messageError.emptyMark") }]}
            >
              <Select
                onSelect={(value) => changeModel(value)}
                style={{ marginBottom: margin, width: 150 }}
                placeholder={t("mainContent.table.mark")}
              >
                {marcData.map((item, i) => (
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
                style={{ marginBottom: margin, width: 200 }}
                placeholder={t("mainContent.table.model")}
              >
                {items.map((item, i) => (
                  <Select.Option key={i} value={item.nom_modelo}>
                    {item.nom_modelo}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item> */}

            <Form.Item name="seguro">
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
