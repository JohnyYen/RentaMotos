import { Button, message, Modal, Typography } from "antd";
import "../App.css";
import axios from "axios";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useTranslation } from "react-i18next";

const EliminarContrato = ({ isOpen, setOpen, setDataSource, dataSource }) => {
  const { row } = useContext(GlobalContext);

  // Translation
  const [t] = useTranslation("global");
  
  const Econtrato = async () => {
    const jwt = JSON.parse(sessionStorage.getItem('jwt'))
    try {
      const apiUrl = `http://localhost:3000/api/contract/${row?.matricula}`;
      const response = await axios.delete(apiUrl , {headers : {'Authorization': `Bearer ${jwt}`}});
      if(response.status === 200){
        message.success(t("messageSuccess.deleteSuccess"));
        setDataSource(dataSource.filter(contract => contract.matricula !== row.matricula)); 
        setOpen(false);
      }
    } catch (error) {
      message.error(error.text);
    }

  };

  return (
    <Modal
      title={t("modal.deleteContract")}
      centered={true}
      open={isOpen}
      onClose={setOpen}
      onCancel={setOpen}
      onOk={Econtrato}
    >
      <Typography.Title level={3}>
      {t("notification.deleteContract")}
      </Typography.Title>
    </Modal>
  );
};

//   const EliminarContratoCloseModal = () => {
//     setModalVisible(false);
//   };

//   const handleConfirmDeleteContrato = async () => {
//     try {
//       const apiUrl = `http://localhost:3000/api/contract?idcliente=${idcliente}&matricula=${matricula}  `;
//       const response = await axios.delete(apiUrl);
//       alert('Elemento eliminado con éxito:', response.data);
//     } catch (error) {
//       alert('Error al eliminar el elemento:', error.message || String(error));
//     } finally {
//       setModalVisible(false);
//     }
//   };

//   return (
//     <div className="EliminarElemento">
//       <Button onClick={EliminarContratoOpenModal}>Eliminar Contrato</Button>

//       <Modal className="Eliminar"
//         title="¿Desea eliminar este contrato?"
//         visible={modalVisible}
//         onOk={handleConfirmDeleteContrato}
//         onCancel={EliminarContratoCloseModal}
//         okText="Eliminar"
//         cancelText="Cancelar"

//       >
//         <p className="Mensaje">¿Está seguro que desea eliminar este contrato?</p>
//       </Modal>
//     </div>
//   );
// };

export default EliminarContrato;
