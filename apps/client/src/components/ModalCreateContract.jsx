import { FolderOutlined } from '@ant-design/icons';
import { Checkbox, Col, DatePicker, Input, Modal, Row, Select, Typography } from 'antd'
import axios from 'axios';
import React, { useState } from 'react'

const response = await axios.get('http://localhost:3000/api/formaPago');

let dataSource = [];

if(response.status === 200)
  dataSource = response.data;

console.log(dataSource);
const ModalCreateContract = ({isVisible, setVisible, moto, user}) => {
  const margin = 15;

  const [matricula, setMatricula] = useState('');
  const [ci, setCI] = useState('');
  const [dateFirm, setDateFirm] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [dateBegin, setDateBegin] = useState(new Date());
  const [formaPago, setFormaPago] = useState('');
  const [seguro, setSeguro] = useState(false);

  const handlePetition = () =>{
    console.log([matricula, ci, dateBegin, dateEnd, dateFirm, formaPago, seguro]);
  }
  return (
    <Modal centered={true} open={isVisible} onCancel={setVisible} title={"Rentar Moto"} onOk={handlePetition}>
        <Row gutter={16}>
          <Col span={12}>
            <Input onChange={(e) => setMatricula(e.target.value)} style={{marginBottom:margin, marginTop: 10}} placeholder='Matricula de la Moto'/>

            <Input onChange={(e) => setCI(e.target.value)} style={{marginBottom:margin}}  placeholder='CI Cliente'/>

            <DatePicker onChange={(e) => setDateFirm(e.target.value)} style={{marginBottom:margin}}  placeholder='Fecha de Firma'/>

            <DatePicker onChange={(e) => setDateBegin(e.target.value)} style={{marginBottom:margin}}  placeholder='Fecha de Inicio'/>
          </Col>

          <Col span={12}>
            <DatePicker onChange={(e) => setDateEnd(e.date)} style={{marginBottom:margin}}  placeholder='Fecha de Fin'/>

            <Select onSelect={(value, _) => setFormaPago(value)} style={{marginBottom:margin, width: 150}}  placeholder="Forma de Pago"> 
              {dataSource.map((item, i) => (
                <Select.Option key={i} value={item.formapago}>{item.formaPago}</Select.Option>
              ))}
            </Select>

            <Typography.Paragraph>Seguro <Checkbox onChange={(e) => setSeguro(e.target.checked)} style={{marginBottom:margin}}/> </Typography.Paragraph>

          </Col>

        </Row>
    </Modal>
  )
}

export default ModalCreateContract