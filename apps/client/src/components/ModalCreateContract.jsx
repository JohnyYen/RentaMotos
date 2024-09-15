import { FolderOutlined } from '@ant-design/icons';
import { Checkbox, Col, DatePicker, Form, message, Modal, Row, Select, Typography } from 'antd'
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { GlobalContext, useRow } from '../context/GlobalContext';

const response = await axios.get('http://localhost:3000/api/formaPago');

let dataSource = [];

if(response.status === 200)
  dataSource = response.data;

const ModalCreateContract = ({isVisible, setVisible}) => {

  const [form] = Form.useForm();
  const {row, client} = useContext(GlobalContext);

  const margin = 15;
  const [dateFirm, setDateFirm] = useState('');
  const [dateEnd, setDateEnd] = useState(null);
  const [dateBegin, setDateBegin] = useState('');
  const [formaPago, setFormaPago] = useState('');
  const [seguro, setSeguro] = useState(false);

  const handlePetition = async () =>{

    const contract = {
      idCliente: client.idcliente,
      matricula: row?.matricula,
      beginDate: dateBegin,
      endDate: dateEnd,
      firmaDate: dateFirm,
      formaPago:formaPago,
      seguro: seguro,
      diasProrroga: 0,
    }
    
    console.log(client);
    if(dateBegin && dateEnd && dateFirm && formaPago){
     try {
      const res = await axios.post('http://localhost:3000/api/contract/', contract);
      
      message.success('Creado con exito')
      window.location.reload();
     } catch (error) {
      console.log(error);
      message.error(error.message);
     }

     
    }
  }
  return (
    <Modal okButtonProps={{htmlType:'submit'}} destroyOnClose={true} centered={true} open={isVisible} onCancel={setVisible} title={"Rentar Moto"} onOk={handlePetition}
    modalRender={(dom) => (
      <Form  form={form} labelCol={{span: 16}}  wrapperCol={{span: 24}} autoComplete="off" initialValues={{remember: false,}} layout='vertical'>
          {dom}
      </Form>
  )}
    >
        <Row gutter={16}>
          <Col span={12}>
            {/* <Input value={row?.matricula} onChange={(e) => setMatricula(e.target.value)} style={{marginBottom:margin, marginTop: 10}} placeholder='Matricula de la Moto'/>

            <Input value={client?.idcliente} onChange={(e) => setCI(e.target.value)} style={{marginBottom:margin}}  placeholder='CI Cliente'/> */}

            <Form.Item label='Fecha de Firma:' name="dateFirma" rules={[{required: true,message: 'Introduce la fecha de la firma!',},]}
            shouldUpdate={(prev, curr) => prev !== curr}
            >
              <DatePicker format={'DD/MM/YYYY'} onChange={(value) => setDateFirm(value.format('DD/MM/YYYY'))} style={{marginBottom:margin}}  placeholder='Fecha de Firma'/>
            </Form.Item>

            <Form.Item label='Fecha de Inicio:' name="dateBegin" rules={[{required: true,message: 'Introduce la fecha de Inicio!',},
            ]}
            dependencies={'dateFirma'}
            >
              <DatePicker format={'DD/MM/YYYY'} onChange={(value) => setDateBegin(value.format('DD/MM/YYYY'))} style={{marginBottom:margin}}  placeholder='Fecha de Inicio'/>
            </Form.Item>

          </Col>

          <Col span={12}>
              
              <Form.Item label='Fecha de Fin:' name="dateEnd" rules={[{required: true,message: 'Introduce tu Fecha de Fin!',},
                {validator}
              ]}>
                <DatePicker format={'DD/MM/YYYY'} onChange={(value) => setDateEnd(value.format('DD/MM/YYYY'))} style={{marginBottom:margin}}  placeholder='Fecha de Fin'/>
              </Form.Item>
  
              <Form.Item label='Forma Pago:' name="formaPago" rules={[{required: true,message: 'Introduce tu Forma Pago!',},]}>
                <Select onSelect={(value, _) => setFormaPago(value)} style={{marginBottom:margin, width: 150}}  placeholder="Forma de Pago"> 
                {dataSource.map((item, i) => (
                  <Select.Option key={i} value={item.formapago}>{item.formaPago}</Select.Option>
                ))}
              </Select>
              </Form.Item>
  
              <Form.Item label='Seguro:' name="seguro" rules={[]}>
                <Typography.Paragraph>Seguro <Checkbox onChange={(e) => setSeguro(e.target.checked)} style={{marginBottom:margin}}/> </Typography.Paragraph>
              </Form.Item>

            


          </Col>

        </Row>
    </Modal>
  )
}

export default ModalCreateContract