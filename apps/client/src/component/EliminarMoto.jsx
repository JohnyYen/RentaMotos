import { message, Modal, Typography } from "antd";
import "../App.css";
import axios from "axios";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useTranslation } from "react-i18next";

const EliminarMoto = ({ isOpen, setOpen, setDataSource, dataSource }) => {
  const { row } = useContext(GlobalContext);

  // Translation
  const [t] = useTranslation("global");

  const Emoto = async () => {
    try {
      const apiUrl = `http://localhost:3000/api/moto/${row?.matricula}`;
      const response = await axios.delete(apiUrl);
      if (response.status === 201) {
        message.success(t("messageSuccess.deleteSuccess"));
        setDataSource(dataSource.filter(moto => moto.matricula !== row.matricula));
      }
    } catch (error) {
      message.error(error);
    }
  };

  return (
    <Modal
      title={t("modal.deleteMotorcycle")}
      centered={true}
      open={isOpen}
      onClose={setOpen}
      onCancel={setOpen}
      onOk={Emoto}
    >
      <Typography.Title level={3}>
        {t("notification.deleteMotorcycle")}
      </Typography.Title>
    </Modal>
  );
};

export default EliminarMoto;
