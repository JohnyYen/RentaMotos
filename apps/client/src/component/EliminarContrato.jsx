<<<<<<< HEAD

import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
=======
import{ Button,message,Modal, Typography}from "antd";
import "../App.css";
>>>>>>> 10f7a4a81cfe59fab08ba3842d9529b45ab4e7f9
import axios from 'axios';
import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";




const EliminarContrato = ({isOpen, setOpen}) => {

  const {row} = useContext(GlobalContext);

  const Econtrato = async() =>{


    try{
      const apiUrl = `http://localhost:3000/api/contract/${row?.matricula}`;
      const response = await axios.delete(apiUrl);
      message.success('Se ha eliminado correctamente');
    }
    catch(error){
      message.error(error);
    }

      window.location.reload();
    };


    return (
      <Modal title={'Eliminar Contrato'} centered={true} open={isOpen} onClose={setOpen} onCancel={setOpen} onOk={Econtrato}>
        <Typography.Title level={3}>¿Estás seguro que deseas eliminar el contrato?</Typography.Title>
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

