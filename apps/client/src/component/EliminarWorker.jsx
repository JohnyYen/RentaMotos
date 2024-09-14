import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import { message, Modal, Typography } from 'antd';

const EliminarWorker = ({isOpen, setOpen}) => {
    const {row} = useContext(GlobalContext);

    const EWorker = async () => {
      try{
        console.log(row);
        const apiUrl = `http://localhost:3000/api/user/${row.usuario}`;
        const response = await axios.delete(apiUrl);
        message.success('Eliminado con exito');
      }catch(error){
        message.error(error);
      }
  
      //window.location.reload();
    }
  return (
    <Modal title={'Eliminar Trabajador'} centered={true} open={isOpen} onClose={setOpen} onCancel={setOpen} onOk={EWorker}>
        <Typography.Title level={3}>¿Estás seguro que deseas eliminar al Trabajador?</Typography.Title>
      </Modal> 
  )
}

export default EliminarWorker