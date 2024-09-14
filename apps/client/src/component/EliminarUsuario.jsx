import{message, Modal, Typography}from "antd";
import "../App.css";
import axios from 'axios';
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";





const EliminarUsuario = ({isOpen, setOpen}) => {
 
 const {row} = useContext(GlobalContext);
    const ECliente = async() =>{

    console.log(row);

    try{
      const apiUrl = `http://localhost:3000/api/client/${row?.ci}`;
      const response = await axios.delete(apiUrl);
      message.success('Eliminado con exito');
    }catch(error){
      message.error(error);
    }

    window.location.reload();
  };


return (
  <Modal title={'Eliminar Cliente'} centered={true} open={isOpen} onClose={setOpen} onCancel={setOpen} onOk={ECliente}>
    <Typography.Title level={3}>¿Estás seguro que deseas eliminar al Cliente?</Typography.Title>
  </Modal>      
);
  };
  
  export default  EliminarUsuario;  