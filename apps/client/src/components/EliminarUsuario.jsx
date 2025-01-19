import { message, Modal, Typography } from "antd";
import "../App.css";
import axios from "axios";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useTranslation } from "react-i18next";

const EliminarUsuario = ({ isOpen, setOpen, setDataSource, dataSource }) => {
  // Translation
  const [t] = useTranslation("global");

  const { row } = useContext(GlobalContext);
  const ECliente = async () => {
    
    console.log(row);

    try {
      const apiUrl = `http://localhost:3000/api/client/${row?.ci}`;
      const response = await axios.delete(apiUrl);
      if(response.status === 201){
        message.success(t("messageSuccess.deleteSuccess"));
        setDataSource(dataSource.filter(cliente => cliente.ci !== row.ci));
      }
    } catch (error) {
      message.error(error);
    }
  };

  return (
    <Modal
      title={t("modal.deleteClient")}
      centered={true}
      open={isOpen}
      onClose={setOpen}
      onCancel={setOpen}
      onOk={ECliente}
    >
      <Typography.Title level={3}>
        {t("notification.deleteClient")}
      </Typography.Title>
    </Modal>
  );
};

export default EliminarUsuario;
