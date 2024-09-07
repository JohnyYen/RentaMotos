import { Flex, Input, InputNumber, Modal, Select } from 'antd'
import React, { useState } from 'react'

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
          <InputNumber style={{marginBottom:margin}} onChange={(e) => setEdad(e.target.value)} placeholder='Edad'/>

          <Select style={{marginBottom:margin}} onChange={(e) => setMunicipio(e.target.value)} placeholder='Municipio'>

          </Select>

          <Input style={{marginBottom:margin}} onChange={(e) => setName(e.target.value)} placeholder='Ingrese un nuevo nombre'/>

          <Input style={{marginBottom:margin}} onChange={(e) => setSecondName(e.target.value)} placeholder='Ingrese un nuevo segundo nombre'/>

          <Input style={{marginBottom:margin}} onChange={(e) => setLastName(e.target.value)} placeholder='Ingrese un nuevo primer apellido'/>

          <Input style={{marginBottom:margin}} onChange={(e) => setSecondLast(e.target.value)} placeholder='Ingrese un nuevo segundo apellido'/>

          <Input style={{marginBottom:margin}} onChange={(e) => setNumCont(e.target.value)} placeholder='Ingrese un nuevo numero contacto'/>
        </Flex>
    </Modal>
  )
}

export default ModalModClient