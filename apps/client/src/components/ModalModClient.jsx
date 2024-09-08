import { Flex, Input, InputNumber, Modal, Select } from 'antd'
import React, { useState } from 'react'
import axios from 'axios'

const response = await axios.get('http://localhost:3000/api/mun');
let dataSource = [];
if(response.status === 200)
  dataSource = response.data;

const ModalModClient = ({isOpen, setOpen}) => {

    const [edad, setEdad] = useState(0);
    const [Municipio, setMunicipio] = useState("");
    const [name, setName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [lastName, setLastName] = useState("");
    const [secondLast, setSecondLast] = useState("");
    const [numCont, setNumCont] = useState("");

    const margin = 15;
  return (
    <Modal title={"Modificar Cliente"} centered={true} open={isOpen} onCancel={setOpen} onClose={setOpen}>

        <Flex vertical={true}>

          <Input style={{marginBottom:margin, width: 200}} onChange={(e) => setName(e.target.value)} placeholder='Nuevo nombre'/>

          <Input style={{marginBottom:margin, width: 200}} onChange={(e) => setSecondName(e.target.value)} placeholder='Nuevo segundo nombre'/>

          <Input style={{marginBottom:margin, width: 200}} onChange={(e) => setLastName(e.target.value)} placeholder='Nuevo primer apellido'/>

          <Input style={{marginBottom:margin, width: 200}} onChange={(e) => setSecondLast(e.target.value)} placeholder='Nuevo segundo apellido'/>

          <Input style={{marginBottom:margin, width: 200}} onChange={(e) => setNumCont(e.target.value)} placeholder='Nuevo numero contacto'/>

          <Select style={{marginBottom:margin, width:200}} onSelect={(value) => setMunicipio(value)} placeholder='Municipio'>
            {dataSource.map((item, i) => (
              <Option key={i} value={item.nommun}>{item.nommun}</Option>
            ))}
          </Select>
          
          <InputNumber min={16} max={50} style={{marginBottom:margin, width:150}} onChange={(e) => setEdad(e.target.value)} placeholder='Edad'/>

        </Flex>
    </Modal>
  )
}

export default ModalModClient