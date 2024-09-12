import{ Button,message,Modal, Typography}from "antd";
import "../App.css";
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
  
  export default  EliminarContrato;