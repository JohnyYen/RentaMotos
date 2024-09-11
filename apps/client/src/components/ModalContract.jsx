import { Checkbox, DatePicker, Input, InputNumber, Modal, Select } from 'antd'
import { Option } from 'antd/es/mentions';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

const ModalContract = ({isOpen, setOpen}) => {

    const [ci, setCi] = useState("");
    const [Matricula, setMatricula] = useState("");
    const [formaPago, setFormaPago] = useState("");
    const [Seguro, setSeguro] = useState(false);
    const [diasProrroga, setDiasProrroga] = useState(0);
    const [date, setDate] = useState(new Date());
    const [t] = useTranslation("global");

  return (
    <Modal  destroyOnClose={true} title={t("modal.modifyContract")} open={isOpen} onCancel={setOpen} onClose={setOpen}>
        <Input onChange={(e) => setCi(e.target.value)}/>

        <Input onChange={(e) => setMatricula(e.target.value)}/>

        <Select onChange={(e) => setFormaPago(e.target.value)}>
            <Option>Hola</Option>
        </Select>

        <Checkbox onChange={(e) => setSeguro(e.target.value)}>{t("modal.insurance")}</Checkbox>

        <InputNumber onChange={(e) => setDiasProrroga(e.target.value)}/>

        <DatePicker onChange={(e) => setDate(e.target.value)}/>


    </Modal>
  )
}

export default ModalContract