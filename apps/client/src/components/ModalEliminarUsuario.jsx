import React from "react";
import { Modal } from "antd";
import EliminarUsuario from "./EliminarUsuario";

const ModalEliminarUsuario = ({ isVisible, setVisible, username, onDelete }) => {
  return (
    <Modal
      title="Eliminar Usuario"
      visible={isVisible}
      footer={null}
      onCancel={() => setVisible(false)}
    >
      <EliminarUsuario 
        username={username}
        onDelete={onDelete}
      />
    </Modal>
  );
};

export default ModalEliminarUsuario;
