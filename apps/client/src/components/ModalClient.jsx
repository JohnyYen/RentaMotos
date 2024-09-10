import { Input, InputNumber, Modal, Select } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const ModalClient = ({isOpen, setOpen}) => {

    const [edad, setEdad] = useState(0);
    const [Municipio, setMunicipio] = useState("");
    const [name, setName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [lastName, setLastName] = useState("");
    const [secondLast, setSecondLast] = useState("");
    const [numCont, setNumCont] = useState("");
    const [t] = useTranslation("global");

  return (
    <Modal title={t("modal.modifyClient")} centered={true} open={isOpen} onCancel={setOpen} onClose={setOpen}>

        <InputNumber onChange={(e) => setEdad(e.target.value)}/>

        <Select onChange={(e) => setMunicipio(e.target.value)}>

        </Select>

        <Input onChange={(e) => setName(e.target.value)}/>

        <Input onChange={(e) => setSecondName(e.target.value)}/>

        <Input onChange={(e) => setLastName(e.target.value)}/>

        <Input onChange={(e) => setSecondLast(e.target.value)}/>

        <Input onChange={(e) => setNumCont(e.target.value)}/>
    </Modal>
  )
}

export default ModalClient