import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import { message, Modal, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const EliminarWorker = ({isOpen, setOpen}) => {
    const {row} = useContext(GlobalContext);

    // Translation
    const [t] = useTranslation("global"); 

    const EWorker = async () => {
      try{
        const apiUrl = `http://localhost:3000/api/user/${row?.usuario}`;
        const response = await axios.delete(apiUrl);
        message.success(t("messageSuccess.deleteSuccess"));
        window.location.reload();
      }catch(error){
        message.error(error.text);
      }
  
      //window.location.reload();
    }
  return (
    <Modal title={t("modal.deleteWorker")} centered={true} open={isOpen} onClose={setOpen} onCancel={setOpen} onOk={EWorker}>
        <Typography.Title level={3}>{t("notification.deleteWorker")}</Typography.Title>
      </Modal> 
  )
}

export default EliminarWorker