import { Form, Input, Modal, Select, message } from 'antd'
import axios from 'axios';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'; 

const response = await axios.get('http://localhost:3000/api/client/mun')
let dataSourceMun = [];
if(response.status === 200){
    dataSourceMun = response.data;
}

const ModalCreateWorker = ({isOpen, setOpen, setDataSource, dataSource}) => {

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

        console.log(worker);
        const jwt = JSON.parse(sessionStorage.getItem('jwt'));
        if(name && password && mun){
          const res = await axios.post('http://localhost:3000/api/user/worker', worker, {
            headers: {
              Authorization: `Bearer ${jwt}` 
            }
          });

          if(res.status === 201)
            message.success(t("messageSuccess"));
            setDataSource([...dataSource, {
              key: dataSource[dataSource.length-1].key+1,
              usuario: name,
              municipio: mun
            }])
        }
    }
  return (
    <Modal okButtonProps={{htmlType:'submit'}} afterClose={() => form.resetFields()}  centered={true} title={t("modal.createWorker")} open={isOpen} onClose={setOpen} onCancel={setOpen} onOk={handlePetition}
    modalRender={(dom) => (
      <Form  form={form} labelCol={{span: 16}}  wrapperCol={{span: 24}} autoComplete="off" initialValues={{remember: false,}} layout='vertical'>
          {dom}
      </Form>
  )}
    >
        <Form.Item label={t("profile.username") + ":"} name="userName" rules={[{required: true,message: t("messageError.emptyUsername"),},
          {validator:(rule, value, callback) => {
            if(rule && value){
              const res =  axios.post('http://localhost:3000/api/user/validate', {info : value});
              res.then((response) => {
                if(!response.data)
                  callback(new Error('Este usuario ya existe'));
              })
            }
          }}
        ]}>
          <Input onChange={(e) => setName(e.target.value)} style={{marginBottom:margin, width:300}}  placeholder={t("profile.username")}/>
        </Form.Item>

        <Form.Item label={t("profile.password") + ":"} name="password" rules={[{required: true,message: t("messageError.emptyPassword"),},
          {validator:(rule, value, callback) => {
            if(rule && value){
              const res =  axios.post('http://localhost:3000/api/user/validate', {info : value});
              res.then((response) => {
                if(response.data)
                  callback(new Error(t("messageError.existUser")));
              })
            }
          }},
        ]}>
          <Input.Password onChange={(e) => setPassword(e.target.value)} style={{marginBottom:margin, width:300}} placeholder={t("profile.password")}/>
        </Form.Item>

        <Form.Item label={t("profile.municipality") + ":"} name="municipio" rules={[{required: true,message: t("messageError.emptyMunicipality"),},]}>
          <Select onSelect={(value) => setMun(value)} style={{marginBottom:margin,width:200}} placeholder={t("profile.municipality")}>
              {
                  dataSourceMun.map((item, i) => (
                    <Option key={i}  value={item.nom_mun}>{item.nom_mun}</Option>
                  ))
              }
          </Select>
        </Form.Item>
          
    </Modal>
  )
}

export default ModalCreateWorker