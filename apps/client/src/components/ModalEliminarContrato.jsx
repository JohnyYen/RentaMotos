import React from "react";
import { Modal } from "antd";
import EliminarContrato from "../component/EliminarContrato";

const ModalEliminarContrato = ({ isVisible, setVisible, idcliente, matricula, onDelete }) => {
  return (
    <Modal
      title="Eliminar Contrato"
      visible={isVisible}
      footer={null}
      onCancel={() => setVisible(false)}
    >
      <EliminarContrato 
        idcliente={idcliente}
        matricula={matricula}
        onDelete={onDelete}
      />
    </Modal>
  );
};

export default ModalEliminarContrato;
