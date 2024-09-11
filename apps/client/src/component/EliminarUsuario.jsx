import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import axios from 'axios';



const EliminarUsuario = ({ username, onDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const EliminarUsuarioOpenModal = () => {
    setModalVisible(true);
  };

  const EliminarUsuarioCloseModal = () => {
    setModalVisible(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const apiUrl = `http://localhost:3000/api/user/${username}`;
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
        title="¿Desea eliminar este usuario?"
        visible={modalVisible}
        onOk={handleConfirmDelete}
        onCancel={EliminarUsuarioCloseModal}
        okText="Eliminar"
        cancelText="Cancelar"
        
      >
        <p className="Mensaje">¿Está seguro que desea eliminar este usuario?</p>
      </Modal>
    </div>
  );
};

export default EliminarUsuario;
