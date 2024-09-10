import { Flex, Input, Modal, Select } from 'antd'
import { Option } from 'antd/es/mentions';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const margin = 15;

let marcData = [];
let modelData = [];
let situationData = [];

let response = await axios.get('http://localhost:3000/api/marc');

if(response.status === 200){
    marcData = response.data;
}

response = await axios.get('http://localhost:3000/api/situation');

if(response.status === 200)
    situationData = response.data;

response = await axios.get('http://localhost:3000/api/model');

if(response.status === 200)
    modelData = response.data;


const ModalCreateMoto = ({isVisible, setVisible}) => {

    const [matricula, setMatricula] = useState('');
    const [color, setColor] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [situation, setSituation] = useState('');
    const [items, setItem] = useState([]);

    const changeModel = (value) => {
        setMarca(value);
        setItem(modelData.filter((item) => item.nommarca === value));
        console.log(items);
    }
    
    const handlePetition = () => {

    }
  return (
    <Modal  title={"Crear una nueva moto"} centered={true} open={isVisible} onCancel={setVisible}>
        <Flex vertical={true}>
            <Input onChange={(e) => setMatricula(e.target.value)} style={{marginBottom:margin,width: 300}} placeholder='Ingrese la matricula'/>

            <Select onChange={(value) => setColor(value)} style={{marginBottom:margin,width: 100}} placeholder="Color">
                <Option>Rojo</Option>
                <Option>Azul</Option>
                <Option>Negro</Option>
                <Option>Blanco</Option>
                <Option>Rojo-Negro</Option>
                <Option>Azul-Negro</Option>
                <Option>Rojo-Blanco</Option>
                <Option>Blanco-Negro</Option>
            </Select>

            <Select onSelect={(value, _) => changeModel(value)} style={{marginBottom:margin,width: 150}} placeholder="Marca">
                {marcData.map((item, i) => (
                    <Select.Option key={i} value={item.nommarca}>{item.nommarca}</Select.Option>
                ))}
            </Select>

            <Select onChange={(value) => setModelo(value)} style={{marginBottom:margin, width: 200}} placeholder="Modelo">
                {items.map((item, i) => (
                    <Select.Option key={i} value={item.nommodelo}>{item.nommodelo}</Select.Option>
                ))}
            </Select>

            <Select onChange={(value) => setSituation(value)} style={{marginBottom:margin, width:150}} placeholder="Situacion">
                {situationData.map((item, i) => (
                    <Select.Option key={i} value={item.situacion}>{item.situacion}</Select.Option>
                ))}
            </Select>
        </Flex>
    </Modal>
  )
}

export default ModalCreateMoto