import { FolderOutlined } from '@ant-design/icons';
import { Checkbox, Col, DatePicker, Input, Modal, Row, Select, Typography } from 'antd'
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { GlobalContext, useRow } from '../context/GlobalContext';

const response = await axios.get('http://localhost:3000/api/formaPago');

let dataSource = [];

if(response.status === 200)
  dataSource = response.data;

const ModalCreateContract = ({isVisible, setVisible}) => {

  const {row, client} = useContext(GlobalContext);

  const margin = 15;
  const [dateFirm, setDateFirm] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [dateBegin, setDateBegin] = useState(new Date());
  const [formaPago, setFormaPago] = useState('');
  const [seguro, setSeguro] = useState(false);

  const handlePetition = async () =>{

    console.log(typeof());
    console.log(client?.idcliente);
    // const res = await axios.post('http://localhost:3000/api/contract/', {
    //   idCliente: toString(client?.idcliente),
    //   matricula: row?.matricula,
    //   beginDate: dateBegin,
    //   endDate: dateEnd,
    //   firmaDate: dateFirm,
    //   formapago:formaPago,
    //   seguro: seguro,
    //   diasProrroga: 0,
    // })

    console.log(res.status);
  }
  return (
    <Modal centered={true} open={isVisible} onCancel={setVisible} title={"Rentar Moto"} onOk={handlePetition}>
        <Row gutter={16}>
          <Col span={12}>
            {/* <Input value={row?.matricula} onChange={(e) => setMatricula(e.target.value)} style={{marginBottom:margin, marginTop: 10}} placeholder='Matricula de la Moto'/>

            <Input value={client?.idcliente} onChange={(e) => setCI(e.target.value)} style={{marginBottom:margin}}  placeholder='CI Cliente'/> */}

            <DatePicker format={'DD/MM/YYYY'} onChange={(value) => setDateFirm(value.format('DD/MM/YYYY'))} style={{marginBottom:margin}}  placeholder='Fecha de Firma'/>

            <DatePicker format={'DD/MM/YYYY'} onChange={(value) => setDateBegin(value.format('DD/MM/YYYY'))} style={{marginBottom:margin}}  placeholder='Fecha de Inicio'/>
          </Col>

          <Col span={12}>
            <DatePicker format={'DD/MM/YYYY'} onChange={(value) => setDateEnd(value.format('DD/MM/YYYY'))} style={{marginBottom:margin}}  placeholder='Fecha de Fin'/>

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