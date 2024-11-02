import { Flex, Form, Input, message, Modal, Select } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

const margin = 0;

let marcData = [];
let modelData = [];
let situationData = [];

let response = await axios.get('http://localhost:3000/api/marc');

if(response.status === 200){
    marcData = response.data;
}

response = await axios.get('http://localhost:3000/api/situation');

if(response.status === 200)
    situationData = response.data.filter((item) => item.situacion !== 'Alquilada');

response = await axios.get('http://localhost:3000/api/model');

if(response.status === 200)
    modelData = response.data;


const ModalCreateMoto = ({isVisible, setVisible}) => {

    const [form] = Form.useForm();
    const [matricula, setMatricula] = useState('');
    const [color, setColor] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [situation, setSituation] = useState('');
    const [items, setItem] = useState([]);
    const [t] = useTranslation("global");

    const changeModel = (value) => {
        setMarca(value);
        setItem(modelData.filter((item) => item.nommarca === value));
    }
    
    const handlePetition = async () => {
        const moto = {
            matricula:matricula,
            color:color,
            cantKm:0,
            marca:marca,
            modelo:modelo,
            situacion:situation
        }

        // console.log(moto);

        if(matricula && color && marca && modelo && situation){
            const resp = await axios.post('http://localhost:3000/api/moto', moto);

            if(resp.status === 201)
                message.success(t("messageSuccess"))

            window.location.reload();
        }
    }
  return (
    <Modal okButtonProps={{htmlType:'submit'}} afterClose={() => form.resetFields()}  destroyOnClose={true} title={t("modal.createMotorcycle")} centered={true} open={isVisible} onCancel={setVisible} onOk={handlePetition}
    modalRender={(dom) => (
        <Form  form={form} labelCol={{span: 12}}  wrapperCol={{span: 16}} autoComplete="off" initialValues={{remember: false,}} layout='vertical'>
          {dom}
        </Form>
      )}>
       <Form.Item label={t("mainContent.table.serialNumber")} name="matricula" rules={[{required: true,message: t("messageError.emptySerialNumber"),},
        {len:8, message: t("messageError.lengthSerialNumber")}
       ]}>
            <Input max={8} min={8} onChange={(e) => setMatricula(e.target.value)} style={{marginBottom:margin,width: 300}} placeholder='Ingrese la matricula'/>
           </Form.Item>

            <Form.Item label='Color:' name="color" rules={[{required: true,message: t("messageError.emptyColor"),},]}>
                <Select onSelect={(value) => setColor(value)} style={{marginBottom:margin,width: 100}} placeholder="Color">
                    <Select.Option value='Rojo'>{t("mainContent.table.colors.red")}</Select.Option>
                    <Select.Option value='Azul'>{t("mainContent.table.colors.blue")}</Select.Option>
                    <Select.Option value='Negro'>{t("mainContent.table.colors.black")}</Select.Option>
                    <Select.Option value='Blanco'>{t("mainContent.table.colors.white")}</Select.Option>
                    <Select.Option value='Rojo-Negro'>{t("mainContent.table.colors.red-black")}</Select.Option>
                    <Select.Option value='Azul-Negro'>{t("mainContent.table.colors.blue-black")}</Select.Option>
                    <Select.Option value='Rojo-Blanco'>{t("mainContent.table.colors.red-white")}</Select.Option>
                    <Select.Option value='Blanco-Negro'>{t("mainContent.table.colors.white-black")}</Select.Option>
                </Select>
            </Form.Item>

           <Form.Item label={t("mainContent.table.mark") + ":"} name="marca" rules={[{required: true,message: t("messageError.emptyMark"),},]}>
            <Select onSelect={(value, _) => changeModel(value)} style={{marginBottom:margin,width: 150}} placeholder={t("mainContent.table.mark")}>
                    {marcData.map((item, i) => (
                        <Select.Option key={i} value={item.nommarca}>{item.nommarca}</Select.Option>
                    ))}
                </Select>
           </Form.Item>

           <Form.Item label={t("mainContent.table.model") + ":"} name="modelo" rules={[{required: true,message: t("messageError.emptyModel"),},]}>
            <Select onChange={(value) => setModelo(value)} style={{marginBottom:margin, width: 200}} placeholder={t("mainContent.table.model")}>
                    {items.map((item, i) => (
                        <Select.Option key={i} value={item.nommodelo}>{item.nommodelo}</Select.Option>
                    ))}
                </Select>
           </Form.Item>

           <Form.Item label={t("mainContent.table.situation") + ":"} name="situacion" rules={[{required: true,message: t("messageError.emptySituation"),},]}>
            <Select onChange={(value) => setSituation(value)} style={{marginBottom:margin, width:150}} placeholder={t("mainContent.table.situation")}>
                    {situationData.map((item, i) => (
                        <Select.Option key={i} value={item.situacion}>{item.situacion}</Select.Option>
                    ))}
                </Select>
           </Form.Item>

                
    </Modal>
  )
}

export default ModalCreateMoto