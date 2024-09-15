import { Col, Flex, Form, Input, InputNumber, message, Modal, Row, Select } from 'antd'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

    const  [t] = useTranslation("global");

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
                    
                    <Form.Item label={t("profile.name") + ":"} name="nombre" rules={[{required: true,message: t("messageError.emptyName"),},]}>
                    <Input onChange={(e) => setName(e.target.value)} style={{marginBottom:margin, width:300}}  placeholder={t("profile.name")}/>
                    </Form.Item>

                    <Form.Item label='CI:' name="ci" rules={[{required: true,message: 'Introduce tu CI!',},]}>
                        <Input minLength={11} maxLength={11} onChange={(e) => setCi(e.target.value)} style={{marginBottom:margin, width:300}}  placeholder='CI'/>
                    </Form.Item>

                    <Form.Item label={t("profile.middleName") + ":"} name="segundo_nombre" rules={[{required: true,message: t("messageError.emptySecondName"),},]}>
                        <Input onChange={(e) => setSecondtName(e.target.value)} style={{marginBottom:margin, width:300}}  placeholder={t("profile.middleName")}/>
                    </Form.Item>

                    <Form.Item label={t("profile.lastName") + ":"} name="apellido" rules={[{required: true,message: t("messageError.emptyLastName"),},]}>
                        <Input onChange={(e) => setLastName(e.target.value)} style={{marginBottom:margin, width:300}}  placeholder={t("profile.lastName")}/>
                    </Form.Item>

                </Flex>
            </Col>

            <Col span={30}>
                <Flex vertical={true}>

                    <Form.Item label={t("profile.secondLastName") + ":"} name="segundo_apellido" rules={[{required: true,message: t("messageError.emptySecondLastName"),},]}>
                        <Input onChange={(e) => setSecondLastName(e.target.value)} style={{marginBottom:margin, width:300}}  placeholder={t("profile.secondLastName")}/>
                    </Form.Item>

                    <Form.Item label={t("login.username") + ":"} name="user_name" rules={[{required: true,message: t("messageError.emptyUsername"),},]}>
                        <Input onChange={(e) => setUserName(e.target.value)} style={{marginBottom:margin, width:300}} placeholder={t("login.username")}/>
                    </Form.Item>

                    <Form.Item label={t("profile.email") + ":"} name="email" rules={[{required: true,message: t("messageError.emptyEmail"),},]}>
                        <Input onChange={(e) => setEmail(e.target.value)} style={{marginBottom:margin, width:300}} placeholder={t("profile.email")}/>
                    </Form.Item>

                    <Form.Item label={t("login.password") + ":"} name="password" rules={[{required: true,message: t("messageError.emptyPassword"),},]}>
                        <Input.Password onChange={(e) => setPassword(e.target.value)} style={{marginBottom:margin, width:300}} placeholder={t("login.password")}/>
                    </Form.Item>
                </Flex>
            </Col>
                
            <Col span={30}>
                <Flex vertical={true}>
                <Form.Item label={t("profile.contactNuber") + ":"} name="num_cont" rules={[{required: true,message: t("messageError.emptyContactNumber"),},]}>
                        <Input onChange={(e) => setNumCont(e.target.value)} style={{marginBottom:margin, width:300}} placeholder={t("profile.contactNumber")}/>
                    </Form.Item>

                    <Form.Item label={t("profile.age") + ":"} name="edad" rules={[{required: true,message: t("messageError.emptyAge"),},]}>
                        <InputNumber onChange={(value) => setEdad(value)} style={{marginBottom:margin, width:60}} placeholder={t("profile.age")} min={16}/>
                    </Form.Item>

                    <Form.Item label={t("profile.municipality") + ":"} name="municipio" rules={[{required: true,message: t("messageError.emptyMunicipality"),},]}>
                        <Select onSelect={(value) => setMun(value)} style={{marginBottom:margin,width:200}} placeholder={t("profile.municipality")}>
                            {
                                dataSource.map((item, i) => (
                                    <Select.Option key={i}  value={item.nommun}>{item.nommun}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item label={t("profile.sex") + ":"} name="sexo" rules={[{required: true,message: t("messageError.emptySex"),},]}>
                        <Select onChange={(value) => setSex(value)} style={{marginBottom:margin}} placeholder={t("profile.sex")}>
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

export default ModalCreateClient;