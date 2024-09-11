import { Flex, InputNumber, Modal, Select } from 'antd'
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext';

const response = await axios.get('http://localhost:3000/api/situation');
let dataSource;

if(response.status === 200)
  dataSource = response.data;

const ModalModMoto = ({isOpen, setOpen}) => {

    const {row} = useContext(GlobalContext);

    const [color, setColor] = useState('');
    const [cantKm, setCantKm] = useState(0);
    const [Situacion, setSituacion] = useState('');

  const margin = 15;
  const handlePetition = async () => {

    const moto = {
      matricula:row?.matricula,
      color:color,
      cantKm:cantKm,
      marca:row?.marca,
      modelo:row?.modelo,
      situacion:Situacion
    }

    //console.log(typeof(moto.cantKm));
    const res = await axios.patch(`http://localhost:3000/api/moto/${moto.matricula}`, moto);
    //console.log(response);

    window.location.reload();
  }
  return (
    <Modal  destroyOnClose={true} title={"Modificar Moto"}  open={isOpen} centered={true} onCancel={setOpen} onClose={setOpen} onOk={handlePetition}>
      <Flex vertical={true}>
        <Select style={{marginBottom:margin}}  onSelect={(value) => setColor(value)} placeholder={row?.color}>
            <Select.Option value='Rojo'>Rojo</Select.Option>
            <Select.Option value='Azul'>Azul</Select.Option>
            <Select.Option value='Negro'>Negro</Select.Option>
            <Select.Option value='Blanco'>Blanco</Select.Option>
            <Select.Option value='Rojo-Negro'>Rojo-Negro</Select.Option>
            <Select.Option value='Azul-Negro'>Azul-Negro</Select.Option>
            <Select.Option value='Rojo-Blanco'>Rojo-Blanco</Select.Option>
            <Select.Option value='Blanco-Negro'>Blanco-Negro</Select.Option>
        </Select>

        <InputNumber min={row?.kmRecorridos} style={{marginBottom:margin}} onChange={(e) => setCantKm(e)} placeholder={row ? row.kmRecorridos : 0}/>

        <Select style={{marginBottom:margin}} onSelect={(e) => setSituacion(e)} placeholder={row?.situacion ? row.situacion : 'Situacion'}>
            {dataSource.map((item, i) => (
              <Select.Option key={i} value={item.situacion}>{item.situacion}</Select.Option>
            ))}
        </Select>
      </Flex>
    </Modal>
  )
}

export default ModalModMoto