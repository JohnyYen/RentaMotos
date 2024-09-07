import { Flex, InputNumber, Modal, Select } from 'antd'
import React, { useState } from 'react'

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
        <Select style={{marginBottom:margin}}  onChange={(e) => setColor(e.target.value)} placeholder='Color'>

        </Select>

        <InputNumber style={{marginBottom:margin}} onChange={(e) => setCantKm(e.target.value)} placeholder='CantKm'/>

        <Select style={{marginBottom:margin}} onChange={(e) => setSituacion(e.target.value)} placeholder='Situacion'>

        </Select>
      </Flex>
    </Modal>
  )
}

export default ModalModMoto