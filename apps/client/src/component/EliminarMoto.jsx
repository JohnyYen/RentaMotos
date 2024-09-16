import {message, Modal, Typography }from "antd";
import "../App.css";
import axios from 'axios';
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const EliminarMoto = ({isOpen, setOpen}) => {
  
  const {row} = useContext(GlobalContext);

  const Emoto = async() =>{
    try{
      const apiUrl = `http://localhost:3000/api/moto/${row?.matricula}`;
      const response = await axios.delete(apiUrl);
      message.success('Eliminado con exito');
    }
    catch(error){
      message.error(error);
    }

    window.location.reload();
  };
  

    return (
      <Modal title={'Eliminar Moto'} centered={true} open={isOpen} onClose={setOpen} onCancel={setOpen} onOk={Emoto}>
        <Typography.Title level={3}>¿Estás seguro que deseas eliminar el moto?</Typography.Title>
      </Modal>      
    );
  };
  
  export default  EliminarMoto;