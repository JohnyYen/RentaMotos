import { Form, Input, Modal, Select } from 'antd'
import axios from 'axios';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'; 

const response = await axios.get('http://localhost:3000/api/mun')
let dataSource = [];
if(response.status === 200){
    dataSource = response.data;
}

const ModalCreateWorker = ({isOpen, setOpen}) => {

    const [form] = Form.useForm();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [mun, setMun] = useState('');
    const [t] = useTranslation("global");

    const margin = 0;
    const handlePetition = async () =>{
        const worker = {
            user_name: name,
            password: password,
            mun: mun
        }

        if(name && password && mun){
          const res = await axios.post('http://localhost:3000/api/user/worker', worker);

          if(resp.status === 201)
            message.success('Creado con exito')

          window.location.reload();
        }
    }
  return (
    <Modal okButtonProps={{htmlType:'submit'}} afterClose={() => form.resetFields()}  centered={true} title='Crear Trabajador' open={isOpen} onClose={setOpen} onCancel={setOpen} onOk={handlePetition}
    modalRender={(dom) => (
      <Form  form={form} labelCol={{span: 16}}  wrapperCol={{span: 24}} autoComplete="off" initialValues={{remember: false,}} layout='vertical'>
          {dom}
      </Form>
  )}
    >
        <Form.Item label='Nombre de Usuario:' name="userName" rules={[{required: true,message: 'Introduce el nombre de Usuario!',},
          {validator:(rule, value, callback) => {
            if(rule && value){
              const res =  axios.post('http://localhost:3000/api/user/validate', {info : value});
              res.then((response) => {
                if(response.data)
                  callback(new Error('Este usuario ya existe'));
              })
            }
          }}
        ]}>
          <Input onChange={(e) => setName(e.target.value)} style={{marginBottom:margin, width:300}}  placeholder='Ingrese su nombre'/>
        </Form.Item>

        <Form.Item label='Contraseña:' name="password" rules={[{required: true,message: 'Introduce la Contraseña!',},
          {validator:(rule, value, callback) => {
            if(rule && value){
              const res =  axios.post('http://localhost:3000/api/user/validate', {info : value});
              res.then((response) => {
                if(response.data)
                  callback(new Error('Este usuario ya existe'));
              })
            }
          }},
        ]}>
          <Input.Password onChange={(e) => setPassword(e.target.value)} style={{marginBottom:margin, width:300}} placeholder='Ingrese su contraseña'/>
        </Form.Item>

        <Form.Item label={t("profile.municipality") + ":"} name="municipio" rules={[{required: true,message: t("messageError.emptyMunicipality"),},]}>
          <Select onSelect={(value) => setMun(value)} style={{marginBottom:margin,width:200}} placeholder={t("profile.municipality")}>
              {
                  dataSource.map((item, i) => (
                    <Option key={i}  value={item.nommun}>{item.nommun}</Option>
                  ))
              }
          </Select>
        </Form.Item>
          
    </Modal>
  )
}

export default ModalCreateWorker