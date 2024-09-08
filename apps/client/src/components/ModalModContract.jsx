import { Checkbox, DatePicker, Flex, Input, InputNumber, Modal, Select } from 'antd'
import { Option } from 'antd/es/mentions';
import axios from 'axios';
import React, { useState } from 'react'

const response = await axios.get('http://localhost:3000/api/formaPago')
let dataSource = [];

if(response.status === 200)
  dataSource = response.data;

const ModalModContract = ({isOpen, setOpen}) => {

    const [ci, setCi] = useState("");
    const [Matricula, setMatricula] = useState("");
    const [formaPago, setFormaPago] = useState("");
    const [Seguro, setSeguro] = useState(false);
    const [diasProrroga, setDiasProrroga] = useState(0);
    const [date, setDate] = useState(new Date());

    const margin = 15;

    const handlePetition = () =>{
      console.log([Seguro, diasProrroga, date, formaPago])
    }
  return (
    <Modal title={"Modificar Contrato"} open={isOpen} onOk={handlePetition} onCancel={setOpen} onClose={setOpen}>
        <Flex vertical={true}>
          {/* <Input onChange={(e) => setCi(e.target.value)} placeholder='Modifique su CI'/>

          <Input onChange={(e) => setMatricula(e.target.value)} placeholder=''/> */}

          <Select style={{marginBottom:margin}} onSelect={(e) => setFormaPago(e)} placeholder='Metodo de Pago'>
              {dataSource.map((item, i) => (
                <Select.Option key={i} value={item.formapago}>{item.formapago}</Select.Option>
              ))}
          </Select>

          <Checkbox title='Seguro' style={{marginBottom:margin}} onChange={(e) => setSeguro(e.target.value)}>Seguro</Checkbox>

          <InputNumber style={{marginBottom:margin, width:150}} onChange={(e) => setDiasProrroga(e.target.value)} placeholder='Prorroga'/>

          <DatePicker placeholder='Fecha Fin' style={{marginBottom:margin}} onChange={(e) => setDate(e.target.value)}/>
        </Flex>


    </Modal>
  )
}

export default ModalModContract