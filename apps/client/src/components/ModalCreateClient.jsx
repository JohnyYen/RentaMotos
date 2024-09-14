import { Col, Flex, Form, Input, InputNumber, message, Modal, Row, Select } from 'antd'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';

const response = await axios.get('http://localhost:3000/api/mun')
let dataSource = [];
if(response.status === 200){
    dataSource = response.data;
}

const ModalCreateClient = ({isVisible, setVisible}) => {

    const [form] = Form.useForm();

    const [name, setName] = useState('');
    const [ci, setCi] = useState('');
    const [lastName, setLastName] = useState('')
    const [secondLastName, setSecondLastName] = useState('')
    const [secondName, setSecondtName] = useState('')
    const [sex, setSex] = useState('')
    const [edad, setEdad] = useState(16)
    const [mun, setMun] = useState('')
    const [numCont, setNumCont] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const {setUser, setClient} = useContext(GlobalContext);

    const navigate = useNavigate();

    const handlePetition = async () => {
        const user = {
            user_name: userName,
            password: password,
            email: email,
            id: ci
        };

        const client = {
            idCliente: ci,
            nombre: name,
            segNombre: secondName,
            primApellido: lastName,
            segApellido: secondLastName,
            edad: edad,
            municipio: mun,
            sexo: sex,
            numCont: numCont
        }
        
        if(ci && name && secondName && lastName && secondLastName && edad && mun && sex && numCont){
            let response = await axios.post('http://localhost:3000/api/client',client);
            console.log(response.status);
            if(response.status === 201){
                response = await axios.post('http://localhost:3000/api/user/client', user);
                if(response.status === 201){
                    message.success('Creado con exito')
                    setClient(client);
                    setUser(user);
                    navigate('/client');
                }
            }
        }
    }
    const margin = -10;
  return (
    <Modal okButtonProps={{htmlType:'submit'}} destroyOnClose={true} width={1200} title={"Crear un Nuevo Usuario"} centered={true} open={isVisible} onCancel={setVisible} onOk={handlePetition}
    modalRender={(dom) => (
        <Form  form={form} labelCol={{span: 12}}  wrapperCol={{span: 16}} autoComplete="off" initialValues={{remember: false,}} layout='vertical'>
            {dom}
        </Form>
    )}
    >
        <Row gutter={90}>
            <Col span={30}>
                <Flex vertical={true}>
                    
                    <Form.Item label='Nombre:' name="nombre" rules={[{required: true,message: 'Introduce tu nombre!',},
                        {min:2, max:20, message: "La longitud de su nombre debe de estar entre 2 y 20 caracteres"}
                    ]}>
                    <Input onChange={(e) => setName(e.target.value)} style={{marginBottom:margin, width:300}}  placeholder='Ingrese su nombre'/>
                    </Form.Item>

                    <Form.Item label='CI:' name="ci" rules={[{required: true,message: 'Introduce tu CI!',},
                        {len:11, message:'El carnet de Identidad debe de tener 11 digitos'}
                    ]}>
                        <Input minLength={11} maxLength={11} onChange={(e) => setCi(e.target.value)} style={{marginBottom:margin, width:300}}  placeholder='Ingrese su CI'/>
                    </Form.Item>

                    <Form.Item label='Segundo Nombre:' name="segundo_nombre" rules={[{required: true,message: 'Introduce tu segundo nombre!',},
                        {max:20, message: "La longitud de su segundo nombre debe de estar entre 2 y 20 caracteres"}
                    ]}>
                        <Input onChange={(e) => setSecondtName(e.target.value)} style={{marginBottom:margin, width:300}}  placeholder='Ingrese su segundo nombre'/>
                    </Form.Item>

                    <Form.Item label='Apellido:' name="apellido" rules={[{required: true,message: 'Introduce tu apellido!',},
                        {min:2, max:25, message: "La longitud de su apellido debe de estar entre 2 y 20 caracteres"}
                    ]}>
                        <Input onChange={(e) => setLastName(e.target.value)} style={{marginBottom:margin, width:300}}  placeholder='Ingrese su apellido'/>
                    </Form.Item>

                </Flex>
            </Col>

            <Col span={30}>
                <Flex vertical={true}>

                    <Form.Item label='Segundo Apellido:' name="segundo_apellido" rules={[{required: true,message: 'Introduce tu segundo apellido!',},
                        { max:25, message: "La longitud de su apellido debe de estar entre 2 y 20 caracteres"}
                    ]}>
                        <Input onChange={(e) => setSecondLastName(e.target.value)} style={{marginBottom:margin, width:300}}  placeholder='Ingrese su segundo apellido'/>
                    </Form.Item>

                    <Form.Item label='Nombre de Usuario:' name="user_name" rules={[{required: true,message: 'Introduce tu matricula!',},
                        {min:4, max:20, message: "La longitud de su nombre de usuario debe de estar entre 2 y 20 caracteres"},
                        {validator:(rule, value, callback) => {
                            if(rule && value){
                                console.log(value);
                                const res = axios.post('http://localhost:3000/api/user/validate', {info : value});
                                res.then((response) => {
                                    if(response.data)
                                        callback(new Error('Ya existe el usuario'));
                                })
                            }
                            
                        }}
                    ]}>
                        <Input onChange={(e) => setUserName(e.target.value)} style={{marginBottom:margin, width:300}} placeholder='Ingrese su nombre de usuario'/>
                    </Form.Item>

                    <Form.Item label='Email:' name="email" rules={[{required: true,message: 'Introduce tu email!',},
                        {validator:(rule, value, callback) => {
                            if(rule && value){
                                const emailValue = value.toLowerCase();
                                if(emailValue.includes('@gmail.com')){
                                    const res = axios.post('http://localhost:3000/api/user/validate', {info : value});
                                    res.then((response) => {
                                    if(response.data)
                                        callback(new Error('Ya existe ese email'));
                                })
                                }
                                else{
                                    callback(new Error('La cadena debe de contener @gmail.com'));
                                }
                            } 
                        }}
                    ]}>
                        <Input onChange={(e) => setEmail(e.target.value)} style={{marginBottom:margin, width:300}} placeholder='Ingrese su email'/>
                    </Form.Item>

                    <Form.Item label='Contraseña:' name="password" rules={[{required: true,message: 'Introduce tu Contraseña!',},]}>
                        <Input.Password onChange={(e) => setPassword(e.target.value)} style={{marginBottom:margin, width:300}} placeholder='Ingrese su contraseña'/>
                    </Form.Item>
                </Flex>
            </Col>
                
            <Col span={30}>
                <Flex vertical={true}>
                <Form.Item label='Numero de Contacto:' name="num_cont" rules={[{required: true,message: 'Introduce tu numero de contacto!',},
                    {max:8, message: "El numero de contacto debe tener 8 dígitos"},
                    {validator: (rule, value, callback) => {
                        if(rule && value){
                            const res = axios.post('http://localhost:3000/api/client/validate/phone', {phoneNumber : value});
                            res.then((response) => {
                                if(response.data)
                                    callback(new Error('Ya existe este telefono'));
                            })
                        }
                    }}
                ]}>
                        <Input onChange={(e) => setNumCont(e.target.value)} style={{marginBottom:margin, width:300}} placeholder='Ingrese su numero de contacto'/>
                    </Form.Item>

                    <Form.Item label='Edad:' name="edad" rules={[{required: true,message: 'Introduce tu edad!',},
                        
                    ]}>
                        <InputNumber onChange={(value) => setEdad(value)} style={{marginBottom:margin, width:60}} placeholder='Edad' min={16}/>
                    </Form.Item>

                    <Form.Item label='Municipio:' name="municipio" rules={[{required: true,message: 'Introduce tu municipio!',},]}>
                        <Select onSelect={(value) => setMun(value)} style={{marginBottom:margin,width:200}} placeholder="Municipio">
                            {
                                dataSource.map((item, i) => (
                                    <Select.Option key={i}  value={item.nommun}>{item.nommun}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item label='Sexo:' name="sexo" rules={[{required: true,message: 'Introduce tu matricula!',},]}>
                        <Select onChange={(value) => setSex(value)} style={{marginBottom:margin}} placeholder="Sexo">
                            <Select.Option value='F'>F</Select.Option>
                            <Select.Option value='M'>M</Select.Option>
                        </Select>
                    </Form.Item>
                </Flex>
            </Col>
        </Row>
    </Modal>
  )
}

export default ModalCreateClient