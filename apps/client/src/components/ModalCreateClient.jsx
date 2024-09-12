import { Col, Flex, Input, InputNumber, message, Modal, Row, Select } from 'antd'
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
    const margin = 15;
  return (
    <Modal  destroyOnClose={true} width={800} title={"Crear un Nuevo Usuario"} centered={true} open={isVisible} onCancel={setVisible} onOk={handlePetition}>

        <Row gutter={24}justify={'space-between'}>
            <Col span={25}>
                <Flex vertical={true}>
                    <Input onChange={(e) => setName(e.target.value)} style={{marginBottom:margin, width:300}}  placeholder='Ingrese su nombre'/>
                    <Input minLength={11} maxLength={11} onChange={(e) => setCi(e.target.value)} style={{marginBottom:margin, width:300}}  placeholder='Ingrese su CI'/>
                    <Input onChange={(e) => setSecondtName(e.target.value)} style={{marginBottom:margin, width:300}}  placeholder='Ingrese su segundo nombre'/>
                    <Input onChange={(e) => setLastName(e.target.value)} style={{marginBottom:margin, width:300}}  placeholder='Ingrese su apellido'/>
                    <Input onChange={(e) => setSecondLastName(e.target.value)} style={{marginBottom:margin, width:300}}  placeholder='Ingrese su segundo apellido'/>
                    <Select onChange={(value) => setSex(value)} style={{marginBottom:margin}} placeholder="Sexo">
                        <Option value='F'>F</Option>
                        <Option value='M'>M</Option>
                    </Select>

                </Flex>
            </Col>

            <Col span={25}>
                <Flex vertical={true}>
                    <Input onChange={(e) => setUserName(e.target.value)} style={{marginBottom:margin, width:300}} placeholder='Ingrese su nombre de usuario'/>
                    <Input onChange={(e) => setEmail(e.target.value)} style={{marginBottom:margin, width:300}} placeholder='Ingrese su email'/>
                    <Input.Password onChange={(e) => setPassword(e.target.value)} style={{marginBottom:margin, width:300}} placeholder='Ingrese su contraseña'/>
                    <Input onChange={(e) => setNumCont(e.target.value)} style={{marginBottom:margin, width:300}} placeholder='Ingrese su numero de contacto'/>
                    <InputNumber onChange={(value) => setEdad(value)} style={{marginBottom:margin, width:60}} placeholder='Edad' min={16}/>
                    <Select onSelect={(value) => setMun(value)} style={{marginBottom:margin,width:200}} placeholder="Municipio">
                        {
                            dataSource.map((item, i) => (
                                <Option key={i}  value={item.nommun}>{item.nommun}</Option>
                            ))
                        }
                    </Select>
                </Flex>
            </Col>
        </Row>
    </Modal>
  )
}

export default ModalCreateClient