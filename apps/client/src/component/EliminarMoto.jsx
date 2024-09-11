
import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import axios from 'axios';



const EliminarMoto = ({ idmoto, onDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const EliminarMotoOpenModal = () => {
    setModalVisible(true);
  };

  const EliminarMotoCloseModal = () => {
    setModalVisible(false);
  };

  const handleConfirmDeleteMoto = async () => {
    try {
      const apiUrl = `http://localhost:3000/api/moto/${idmoto} `;
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
      

      <Modal className="Eliminar"
        title="¿Desea eliminar esta moto?"
        visible={modalVisible}
        onOk={handleConfirmDeleteMoto}
        onCancel={EliminarMotoCloseModal}
        okText="Eliminar"
        cancelText="Cancelar"
        
      >
        <p className="Mensaje">¿Está seguro que desea eliminar esta moto?</p>
      </Modal>
    </div>
  );
};

export default EliminarMoto;

