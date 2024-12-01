import { Flex, Form, Input, message, Modal, Select } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';


const ModalCreateMoto = ({isVisible, setVisible}) => {

    const [form] = Form.useForm();
    
    const [t] = useTranslation("global");
    const handlePetition = async () => {
        
    }
    
  return (
    <Modal okButtonProps={{htmlType:'submit'}} afterClose={() => form.resetFields()}  destroyOnClose={true} title={"Crear una nueva moto"} centered={true} open={isVisible} onCancel={setVisible} onOk={handlePetition}
    modalRender={(dom) => (
        <Form  form={form} labelCol={{span: 12}}  wrapperCol={{span: 16}} autoComplete="off" initialValues={{remember: false,}} layout='vertical'>
          {dom}
        </Form>
      )}>
    </Modal>
  )
}

export default ModalCreateMoto