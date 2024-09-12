import { Checkbox, DatePicker, Flex, Form, Input, InputNumber, Modal, Select } from 'antd'
import { Option } from 'antd/es/mentions';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext';

const response = await axios.get('http://localhost:3000/api/formaPago')
let dataSource = [];

if(response.status === 200)
  dataSource = response.data;

const ModalModContract = ({isOpen, setOpen}) => {

    const [form] = Form.useForm();
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
    const margin = 0;

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

      if(date && formaPago && seguro && diasProrroga){
        const res = await axios.patch(`http://localhost:3000/api/contract/${row?.matricula}`, contract);

        if(res.status === 500){
          
        }
        else
          window.location.reload();
      }
    }
  return (
    <Modal okButtonProps={{htmlType:'submit'}} afterOpenChange={() => setSeguro(seguro)} destroyOnClose={true} title={"Modificar Contrato"} open={isOpen} onOk={handlePetition} onCancel={setOpen}  onClose={setOpen}
     modalRender={(dom) => (
      <Form  form={form} labelCol={{span: 16}}  wrapperCol={{span: 24}} autoComplete="off" initialValues={{remember: false,}} layout='vertical'>
          {dom}
      </Form>
  )}
      >
        <Flex vertical={true}>
          {/* <Input onChange={(e) => setCi(e.target.value)} placeholder='Modifique su CI'/>

          <Input onChange={(e) => setMatricula(e.target.value)} placeholder=''/> */}

          <Form.Item label='Forma Pago:' name="formaPago" rules={[{required: true,message: 'Introduce la Forma de Pago!',},]}>
          <Select style={{marginBottom:margin}} onSelect={(e) => setFormaPago(e)} placeholder={row ? row['forma de pago'] : 'Forma de pago'}>
              {dataSource.map((item, i) => (
                <Select.Option key={i} value={item.formapago}>{item.formapago}</Select.Option>
              ))}
          </Select>
          </Form.Item>

          <Form.Item label='Seguro:' name="seguro" rules={[]}> 
          <Checkbox defaultChecked={seguro} title='Seguro' style={{marginBottom:margin}} onChange={(e) => setSeguro(e.target.checked)}>Seguro</Checkbox>
            
          </Form.Item>

          <Form.Item label='Dias Proroga:' name="diasProrroga" rules={[{required: true,message: 'Introduce los dias Prorroga!',},]}>
            <InputNumber style={{marginBottom:margin, width:150}} onChange={(e) => setDiasProrroga(e)} placeholder={row ? row['prorroga'] : 'Prorroga'}/>
            
          </Form.Item>

          <Form.Item label='Fecha de Fin:' name="dateEnd" rules={[{required: true,message: 'Introduce la fecha de Fin!',},]}>
            <DatePicker format={'DD/MM/YYYY'} placeholder='Fecha Fin' style={{marginBottom:margin}} onChange={(date, dateString) => setDate(dateString)}/>
          </Form.Item>


        </Flex>


    </Modal>
  )
}

export default ModalModContract