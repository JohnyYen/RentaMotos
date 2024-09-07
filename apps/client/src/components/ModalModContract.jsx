import { Checkbox, DatePicker, Flex, Input, InputNumber, Modal, Select } from 'antd'
import { Option } from 'antd/es/mentions';
import React, { useState } from 'react'

const ModalModContract = ({isOpen, setOpen}) => {

    const [ci, setCi] = useState("");
    const [Matricula, setMatricula] = useState("");
    const [formaPago, setFormaPago] = useState("");
    const [Seguro, setSeguro] = useState(false);
    const [diasProrroga, setDiasProrroga] = useState(0);
    const [date, setDate] = useState(new Date());
    const margin = 15;
  return (
    <Modal title={"Modificar Contrato"} open={isOpen} onCancel={setOpen} onClose={setOpen}>
        <Flex vertical={true}>
          {/* <Input onChange={(e) => setCi(e.target.value)} placeholder='Modifique su CI'/>

          <Input onChange={(e) => setMatricula(e.target.value)} placeholder=''/> */}

          <Select style={{marginBottom:margin}} onChange={(e) => setFormaPago(e.target.value)} placeholder='Metodo de Pago'>
              <Option>Hola</Option>
          </Select>

          <Checkbox title='Seguro' style={{marginBottom:margin}} onChange={(e) => setSeguro(e.target.value)}>Seguro</Checkbox>

          <InputNumber style={{marginBottom:margin}} onChange={(e) => setDiasProrroga(e.target.value)} placeholder='Dias Prorroga'/>

          <DatePicker style={{marginBottom:margin}} onChange={(e) => setDate(e.target.value)}/>
        </Flex>


    </Modal>
  )
}

export default ModalModContract