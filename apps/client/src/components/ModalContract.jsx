import { Checkbox, DatePicker, Input, InputNumber, Modal, Select } from 'antd'
import { Option } from 'antd/es/mentions';
import React, { useState } from 'react'

const ModalContract = ({isOpen, setOpen}) => {

    const [ci, setCi] = useState("");
    const [Matricula, setMatricula] = useState("");
    const [formaPago, setFormaPago] = useState("");
    const [Seguro, setSeguro] = useState(false);
    const [diasProrroga, setDiasProrroga] = useState(0);
    const [date, setDate] = useState(new Date());

  return (
    <Modal title={"Modificar Contrato"} open={isOpen} onCancel={setOpen} onClose={setOpen}>
        <Input onChange={(e) => setCi(e.target.value)}/>

        <Input onChange={(e) => setMatricula(e.target.value)}/>

        <Select onChange={(e) => setFormaPago(e.target.value)}>
            <Option>Hola</Option>
        </Select>

        <Checkbox onChange={(e) => setSeguro(e.target.value)}>Seguro</Checkbox>

        <InputNumber onChange={(e) => setDiasProrroga(e.target.value)}/>

        <DatePicker onChange={(e) => setDate(e.target.value)}/>


    </Modal>
  )
}

export default ModalContract