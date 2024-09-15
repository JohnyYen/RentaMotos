import { Button, Flex, Form, InputNumber, Modal, Select } from 'antd'
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext';

const response = await axios.get('http://localhost:3000/api/situation');
let dataSource;

if(response.status === 200)
  dataSource = response.data;

const ModalModMoto = ({isOpen, setOpen}) => {

    const [form] = Form.useForm();
    const {row} = useContext(GlobalContext);

    const [color, setColor] = useState('');
    const [cantKm, setCantKm] = useState(0);
    const [Situacion, setSituacion] = useState('');

  const margin = 0;
  const val = row?.kmRecorridos;
  console.log(val);
  const handlePetition = async () => {

    const moto = {
      matricula:row?.matricula,
      color:color,
      cantKm:cantKm,
      marca:row?.marca,
      modelo:row?.modelo,
      situacion:Situacion
    }


    if(color && cantKm && Situacion){
      const res = await axios.patch(`http://localhost:3000/api/moto/${moto.matricula}`, moto);

      window.location.reload();
    }
      
  }
  return (
    <Modal afterClose={() => form.resetFields()}  okButtonProps={{htmlType:'submit'}} destroyOnClose={true} title={"Modificar Moto"}
      open={isOpen} centered={true} onCancel={setOpen} onClose={setOpen} onOk={() => handlePetition() }
      modalRender={(dom) => (
        <Form  form={form} labelCol={{span: 12}}  wrapperCol={{span: 16}} autoComplete="off" initialValues={{remember: false,}} layout='vertical'>
          {dom}
      </Form>
      )}>   
      <Form.Item label="Color:" name={"color"} rules={[{required:true, message:'El campo de color no debe estar vacio'}]}>
          <Select style={{marginBottom:margin}}  onSelect={(value) => setColor(value)} placeholder={row?.color}>
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

       <Form.Item label="Cantidad de Kilometros:" name={"cantKm"} rules={[{required:true, message:'El campo de cantKm no debe estar vacio'},
       ]}>
        <InputNumber min={row?.kmRecorridos} style={{marginBottom:margin}} onChange={(e) => setCantKm(e)} placeholder={row ? row.kmRecorridos : 0}/>
       </Form.Item>

        <Form.Item label="Situacion:" name={"situacion"} rules={[{required:true, message:'El campo de situacion no debe estar vacio'}]}>
        <Select style={{marginBottom:margin}} onSelect={(e) => setSituacion(e)} placeholder={row?.situacion ? row.situacion : 'Situacion'}>
            {dataSource.map((item, i) => (
              <Select.Option key={i} value={item.situacion}>{item.situacion}</Select.Option>
            ))}
        </Select>
        </Form.Item>
        
       
    </Modal>
  )
}

export default ModalModMoto