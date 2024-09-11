import React from "react";
import { Modal } from "antd";
import EliminarMoto from "./EliminarMoto";

const ModalEliminarMoto = ({ isVisible, setVisible, idmoto, onDelete }) => {
  return (
    <Modal
      title="Eliminar Moto"
      visible={isVisible}
      footer={null}
      onCancel={() => setVisible(false)}
    >
      <EliminarMoto 
        idmoto={idmoto}
        onDelete={onDelete}
      />
    </Modal>
  );
};

export default ModalEliminarMoto;
