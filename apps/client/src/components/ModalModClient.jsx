import { Flex, Input, InputNumber, Modal, Select } from 'antd'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { GlobalContext } from '../context/GlobalContext';

const response = await axios.get('http://localhost:3000/api/mun');
let dataSource = [];
if(response.status === 200)
  dataSource = response.data;

const ModalModClient = ({isOpen, setOpen}) => {

    const {row} = useContext(GlobalContext);
    const [edad, setEdad] = useState(0);
    const [Municipio, setMunicipio] = useState("");
    const [name, setName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [lastName, setLastName] = useState("");
    const [secondLast, setSecondLast] = useState("");
    const [numCont, setNumCont] = useState("");

    const handlePetition = async () => {

      //console.log(row);

      const client = {
        idCliente: row?.ci,
        nombre: name,
        segNombre: secondName,
        primApellido: lastName,
        segApellido: secondLast,
        edad: edad,
        municipio: Municipio,
        sexo: 'F',
        numCont:numCont
      }

      console.log(client);

      const res = await axios.patch(`http://localhost:3000/api/client/${row?.ci}`, client);

      window.location.reload();
    }
    const margin = 15;
  return (
    <Modal  destroyOnClose={true} title={"Modificar Cliente"} centered={true} open={isOpen} onCancel={setOpen} onClose={setOpen} onOk={handlePetition}>

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
          
          <InputNumber min={16} max={50} style={{marginBottom:margin, width:150}} onChange={(value) => setEdad(value)} placeholder='Edad'/>

        </Flex>
    </Modal>
  )
}

export default ModalModClient