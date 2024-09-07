import { InputNumber, Modal, Select } from 'antd'
import React, { useState } from 'react'

const ModalMoto = ({isOpen, setOpen}) => {

    const [color, setColor] = useState("");
    const [cantKm, setCantKm] = useState(0);
    const [Situacion, setSituacion] = useState("");

  const handlePetition = () => {

  }
  return (
    <Modal title={"Modificar Moto"}  open={isOpen} centered={true} onCancel={setOpen} onClose={setOpen} onOk={handlePetition}>
      <Select onChange={(e) => setColor(e.target.value)}>

      </Select>

      <InputNumber onChange={(e) => setCantKm(e.target.value)}/>

      <Select onChange={(e) => setSituacion(e.target.value)}>

      </Select>
    </Modal>
  )
}

export default ModalMoto