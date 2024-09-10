import { InputNumber, Modal, Select } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

const ModalMoto = ({isOpen, setOpen}) => {

    const [color, setColor] = useState("");
    const [cantKm, setCantKm] = useState(0);
    const [Situacion, setSituacion] = useState("");
    const [t] = useTranslation("global");

  const handlePetition = () => {

  }
  return (
    <Modal title={t("modal.modifyMotorcycle")}  open={isOpen} centered={true} onCancel={setOpen} onClose={setOpen} onOk={handlePetition}>
      <Select onChange={(e) => setColor(e.target.value)}>

      </Select>

      <InputNumber onChange={(e) => setCantKm(e.target.value)}/>

      <Select onChange={(e) => setSituacion(e.target.value)}>

      </Select>
    </Modal>
  )
}

export default ModalMoto