import { Flex, Form, Input, InputNumber, message, Modal, Select } from 'antd'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { GlobalContext } from '../context/GlobalContext';

const response = await axios.get('http://localhost:3000/api/mun');
let dataSource = [];
if(response.status === 200)
  dataSource = response.data;

const ModalModClient = ({isOpen, setOpen}) => {

    const [form] = Form.useForm();
    const {row} = useContext(GlobalContext);
    const [edad, setEdad] = useState(0);
    const [Municipio, setMunicipio] = useState("");
    const [name, setName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [lastName, setLastName] = useState("");
    const [secondLast, setSecondLast] = useState("");
    const [numCont, setNumCont] = useState("");

    const handlePetition = async () => {

      //console.log(row);

      const client = {
        idCliente: row?.ci,
        nombre: name,
        segNombre: secondName,
        primApellido: lastName,
        segApellido: secondLast,
        edad: edad,
        municipio: Municipio,
        sexo: 'F',
        numCont:numCont
      }

      if(name && secondName && lastName && secondLast && edad && Municipio && numCont){
        const res = await axios.patch(`http://localhost:3000/api/client/${row?.ci}`, client);

        message.success('Creado con exito');
        window.location.reload();
      }
    }
    const margin = 0;
  return (
    <Modal okButtonProps={{htmlType:'submit'}}  destroyOnClose={true} title={"Modificar Cliente"} centered={true} open={isOpen} onCancel={setOpen} onClose={setOpen} onOk={handlePetition}
    modalRender={(dom) => (
      <Form  form={form} labelCol={{span: 16}}  wrapperCol={{span: 24}} autoComplete="off" initialValues={{remember: false,}} layout='vertical'>
          {dom}
      </Form>
  )}
    >

        <Flex vertical={true}>

          <Form.Item label='Nombre:' name="name" rules={[{required: true,message: 'Introduce el nombre!',},]}>
            <Input style={{marginBottom:margin, width: 200}} onChange={(e) => setName(e.target.value)} placeholder='Nuevo nombre'/>
          </Form.Item>

          <Form.Item label='Segundo Nombre:' name="secondName" rules={[{required: true,message: 'Introduce el segundo nombre!',},]}>
            <Input style={{marginBottom:margin, width: 200}} onChange={(e) => setSecondName(e.target.value)} placeholder='Nuevo segundo nombre'/>  
          </Form.Item>


          <Form.Item label='Apellido:' name="primApellido" rules={[{required: true,message: 'Introduce el primer Apellido!',},]}>
           <Input style={{marginBottom:margin, width: 200}} onChange={(e) => setLastName(e.target.value)} placeholder='Nuevo primer apellido'/>        
          </Form.Item>


          <Form.Item label='Segundo Apellido:' name="segApellido" rules={[{required: true,message: 'Introduce el Segundo Apellido!',},]}>
            <Input style={{marginBottom:margin, width: 200}} onChange={(e) => setSecondLast(e.target.value)} placeholder='Nuevo segundo apellido'/>    
          </Form.Item>

          <Form.Item label='Numero Contacto:' name="numCont" rules={[{required: true,message: 'Introduce el numero de contacto!',},]}>
            <Input style={{marginBottom:margin, width: 200}} onChange={(e) => setNumCont(e.target.value)} placeholder='Nuevo numero contacto'/>   
          </Form.Item>


          <Form.Item label='Municipio:' name="municipio" rules={[{required: true,message: 'Introduce el Municipio!',},]}>
            <Select style={{marginBottom:margin, width:200}} onSelect={(value) => setMunicipio(value)} placeholder='Municipio'>
              {dataSource.map((item, i) => (
                <Option key={i} value={item.nommun}>{item.nommun}</Option>
              ))}
            </Select>

          </Form.Item>

            <Form.Item label='Edad:' name="edad" rules={[{required: true,message: 'Introduce la edad!',},]}>
              <InputNumber min={16} max={50} style={{marginBottom:margin, width:150}} onChange={(value) => setEdad(value)} placeholder='Edad'/>
            </Form.Item>


          
          

        </Flex>
    </Modal>
  )
}

export default ModalModClient