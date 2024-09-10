import { Flex, InputNumber, Modal, Select } from 'antd'
import axios from 'axios';
import React, { useState } from 'react'

const response = await axios.get('http://localhost:3000/api/situation');
let dataSource;

if(response.status === 200)
  dataSource = response.data;

console.log(dataSource)
const ModalModMoto = ({isOpen, setOpen}) => {

    const [color, setColor] = useState("");
    const [cantKm, setCantKm] = useState(0);
    const [Situacion, setSituacion] = useState("");
    const margin = 15;
  const handlePetition = () => {

  }
  return (
    <Modal title={"Modificar Moto"}  open={isOpen} centered={true} onCancel={setOpen} onClose={setOpen} onOk={handlePetition}>
      <Flex vertical={true}>
        <Select style={{marginBottom:margin}}  onSelect={(value) => setColor(value)} placeholder='Color'>
          <Option>Rojo</Option>
          <Option>Azul</Option>
          <Option>Negro</Option>
          <Option>Blanco</Option>
          <Option>Rojo-Negro</Option>
          <Option>Azul-Negro</Option>
          <Option>Rojo-Blanco</Option>
          <Option>Blanco-Negro</Option>
        </Select>

        <InputNumber style={{marginBottom:margin}} onChange={(e) => setCantKm(e.target.value)} placeholder='CantKm'/>

        <Select style={{marginBottom:margin}} onChange={(e) => setSituacion(e.target.value)} placeholder='Situacion'>
            {dataSource.map((item, i) => (
              <Select.Option key={i} value={item.situacion}>{item.situacion}</Select.Option>
            ))}
        </Select>
      </Flex>
    </Modal>
  )
}

export default ModalModMoto