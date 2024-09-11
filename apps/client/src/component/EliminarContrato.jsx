
import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import axios from 'axios';



const EliminarContrato = ({ idcliente, matricula }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const EliminarContratoOpenModal = () => {
    setModalVisible(true);
  };

  const EliminarContratoCloseModal = () => {
    setModalVisible(false);
  };

  const handleConfirmDeleteContrato = async () => {
    try {
      const apiUrl = `http://localhost:3000/api/contract?idcliente=${idcliente}&matricula=${matricula}  `;
      const response = await axios.delete(apiUrl);
      alert('Elemento eliminado con éxito:', response.data);
    } catch (error) {
      alert('Error al eliminar el elemento:', error.message || String(error));
    } finally {
      setModalVisible(false);
    }
  };



  return (
    <div className="EliminarElemento">
      <Button onClick={EliminarContratoOpenModal}>Eliminar Contrato</Button>

      <Modal className="Eliminar"
        title="¿Desea eliminar este contrato?"
        visible={modalVisible}
        onOk={handleConfirmDeleteContrato}
        onCancel={EliminarContratoCloseModal}
        okText="Eliminar"
        cancelText="Cancelar"
        
      >
        <p className="Mensaje">¿Está seguro que desea eliminar este contrato?</p>
      </Modal>
    </div>
  );
};

export default EliminarContrato;

