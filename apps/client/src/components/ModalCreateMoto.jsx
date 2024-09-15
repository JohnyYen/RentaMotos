import { Flex, Form, Input, message, Modal, Select } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

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
                message.success('Creado con exito')

            window.location.reload();
        }
    }
  return (
    <Modal okButtonProps={{htmlType:'submit'}} afterClose={() => form.resetFields()}  destroyOnClose={true} title={"Crear una nueva moto"} centered={true} open={isVisible} onCancel={setVisible} onOk={handlePetition}
    modalRender={(dom) => (
        <Form  form={form} labelCol={{span: 12}}  wrapperCol={{span: 16}} autoComplete="off" initialValues={{remember: false,}} layout='vertical'>
          {dom}
        </Form>
      )}>
       <Form.Item label='Matricula:' name="matricula" rules={[{required: true,message: 'Introduce tu matricula!',},
        {len:8, message:"Debe tener 8 caracteres"}
       ]}>
            <Input max={8} min={8} onChange={(e) => setMatricula(e.target.value)} style={{marginBottom:margin,width: 300}} placeholder='Ingrese la matricula'/>
           </Form.Item>

            <Form.Item label='Color:' name="color" rules={[{required: true,message: 'Introduce tu color!',},]}>
                <Select onSelect={(value) => setColor(value)} style={{marginBottom:margin,width: 100}} placeholder="Color">
                    <Select.Option value='Rojo'>Rojo</Select.Option>
                    <Select.Option value='Azul'>Azul</Select.Option>
                    <Select.Option value='Negro'>Negro</Select.Option>
                    <Select.Option value='Blanco'>Blanco</Select.Option>
                    <Select.Option value='Rojo-Negro'>Rojo-Negro</Select.Option>
                    <Select.Option value='Azul-Negro'>Azul-Negro</Select.Option>
                    <Select.Option value='Rojo-Blanco'>Rojo-Blanco</Select.Option>
                    <Select.Option value='Blanco-Negro'>Blanco-Negro</Select.Option>
                </Select>
            </Form.Item>

           <Form.Item label='Marca:' name="marca" rules={[{required: true,message: 'Introduce tu marca!',},]}>
            <Select onSelect={(value, _) => changeModel(value)} style={{marginBottom:margin,width: 150}} placeholder="Marca">
                    {marcData.map((item, i) => (
                        <Select.Option key={i} value={item.nommarca}>{item.nommarca}</Select.Option>
                    ))}
                </Select>
           </Form.Item>

           <Form.Item label='Modelo:' name="modelo" rules={[{required: true,message: 'Introduce tu modelo!',},]}>
            <Select onChange={(value) => setModelo(value)} style={{marginBottom:margin, width: 200}} placeholder="Modelo">
                    {items.map((item, i) => (
                        <Select.Option key={i} value={item.nommodelo}>{item.nommodelo}</Select.Option>
                    ))}
                </Select>
           </Form.Item>

           <Form.Item label='Situacion:' name="situacion" rules={[{required: true,message: 'Introduce tu situacion!',},]}>
            <Select onChange={(value) => setSituation(value)} style={{marginBottom:margin, width:150}} placeholder="Situacion">
                    {situationData.map((item, i) => (
                        <Select.Option key={i} value={item.situacion}>{item.situacion}</Select.Option>
                    ))}
                </Select>
           </Form.Item>
    </Modal>
  )
}

export default ModalCreateMoto