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
    situationData = response.data.filter((item) => item.situacion !== 'Alquilada');

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

        const resp = await axios.post('http://localhost:3000/api/moto', moto);
        window.location.reload();

        if(resp.status === 201)
            console.log(resp);
    }
  return (
    <Modal  destroyOnClose={true} title={"Crear una nueva moto"} centered={true} open={isVisible} onCancel={setVisible} onOk={handlePetition}>
        <Flex vertical={true}>
            <Input max={8} min={8} onChange={(e) => setMatricula(e.target.value)} style={{marginBottom:margin,width: 300}} placeholder='Ingrese la matricula'/>

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