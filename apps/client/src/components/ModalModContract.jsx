import { Checkbox, DatePicker, Flex, Input, InputNumber, Modal, Select } from 'antd'
import { Option } from 'antd/es/mentions';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext';

const response = await axios.get('http://localhost:3000/api/formaPago')
let dataSource = [];

if(response.status === 200)
  dataSource = response.data;

const ModalModContract = ({isOpen, setOpen}) => {

    const {row} = useContext(GlobalContext);
    const [ci, setCi] = useState("");
    const [Matricula, setMatricula] = useState("");
    const [formaPago, setFormaPago] = useState("");
    const r = row ? row['seguro adicional'] == '✔' : false;
    const [seguro, setSeguro] = useState(r)
    //console.log(a);
    const [diasProrroga, setDiasProrroga] = useState(0);
    const [date, setDate] = useState('');

    const handleSeguro = (value) =>{
      seguro = value;
    }
    const margin = 15;

    const handlePetition = async () =>{
      const contract = {
        idCliente:row?.nombre,
        matricula:row?.matricula,
        beginDate:row ? row['fecha de inicio'] : null,
        endDate: date,
        firmaDate: '2024-03-04',
        formaPago: formaPago,
        seguro: seguro,
        diasProrroga: diasProrroga
      }
      //console.log(contract);

      const res = await axios.patch(`http://localhost:3000/api/contract/${row?.matricula}`, contract);

      window.location.reload();
    }
  return (
    <Modal afterOpenChange={() => setSeguro(seguro)} destroyOnClose={true} title={"Modificar Contrato"} open={isOpen} onOk={handlePetition} onCancel={setOpen}  onClose={setOpen}>
        <Flex vertical={true}>
          {/* <Input onChange={(e) => setCi(e.target.value)} placeholder='Modifique su CI'/>

          <Input onChange={(e) => setMatricula(e.target.value)} placeholder=''/> */}

          <Select style={{marginBottom:margin}} onSelect={(e) => setFormaPago(e)} placeholder={row ? row['forma de pago'] : 'Forma de pago'}>
              {dataSource.map((item, i) => (
                <Select.Option key={i} value={item.formapago}>{item.formapago}</Select.Option>
              ))}
          </Select>

          <Checkbox defaultChecked={seguro} title='Seguro' style={{marginBottom:margin}} onChange={(e) => setSeguro(e.target.checked)}>Seguro</Checkbox>

          <InputNumber style={{marginBottom:margin, width:150}} onChange={(e) => setDiasProrroga(e)} placeholder={row ? row['prorroga'] : 'Prorroga'}/>

          <DatePicker format={'DD/MM/YYYY'} placeholder='Fecha Fin' style={{marginBottom:margin}} onChange={(date, dateString) => setDate(dateString)}/>
        </Flex>


    </Modal>
  )
}

export default ModalModContract