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

        console.log(client);
        
        if(ci && name && lastName && edad && mun && sex && numCont){
            let response = await axios.post('http://localhost:3000/api/client',client);
            console.log(response.status);
            if(response.status === 201){
                response = await axios.post('http://localhost:3000/api/user/client', user);
                if(response.status === 201){
                    message.success(t("messageSuccess"))
                    setClient(client);
                    setUser(user);
                    navigate('/client');
                }
            }
        }
    }
    const margin = -10;
  return (
    <Modal okButtonProps={{htmlType:'submit'}} afterClose={() => form.resetFields()}  destroyOnClose={true} width={1200} title={t("modal.createUsername")} centered={true} open={isVisible} onCancel={setVisible} onOk={handlePetition}
    modalRender={(dom) => (
        <Form  form={form} labelCol={{span: 16}}  wrapperCol={{span: 24}} autoComplete="off" initialValues={{remember: false,}} layout='vertical'>
            {dom}
        </Form>
    )}
    >
        <Row gutter={90}>
            <Col span={30}>
                <Flex vertical={true}>
                    
                    <Form.Item label={t("profile.name") + ":"} name="nombre" rules={[{required: true,message: t("messageError.emptyName"),},
                        {min:4, message: t("messageError.minCharName")},
                        {max:20, message: t("messageError.minCharName")}
                    ]}>
                    <Input onChange={(e) => setName(e.target.value)} style={{marginBottom:margin, width:300}}  placeholder={t("profile.name")}/>
                    </Form.Item>

                    <Form.Item label='CI:' name="ci" rules={[{required: true,message: 'Introduce tu CI!',},
                        {len:11, message: t("messageError.lengthID")}
                    ]}>
                        <Input minLength={11} maxLength={11} onChange={(e) => setCi(e.target.value)} style={{marginBottom:margin, width:300}}  placeholder='CI'/>
                    </Form.Item>

                    <Form.Item label={t("profile.middleName") + ":"} name="segundo_nombre" rules={[{required: false,message: t("messageError.emptySecondName"),},
                       {min:4, message: t("messageError.minCharMiddleName")},
                       {max:20, message: t("messageError.maxCharMiddleName")}
                    ]}>
                        <Input onChange={(e) => setSecondtName(e.target.value)} style={{marginBottom:margin, width:300}}  placeholder={t("profile.middleName")}/>
                    </Form.Item>

                    <Form.Item label={t("profile.lastName") + ":"} name="apellido" rules={[{required: true,message: t("messageError.emptyLastName"),},
                         {min:4, message: t("messageError.minCharLastName")},
                         {max:25, message: t("messageError.maxCharLastName")}
                    ]}>
                        <Input onChange={(e) => setLastName(e.target.value)} style={{marginBottom:margin, width:300}}  placeholder={t("profile.lastName")}/>
                    </Form.Item>

                </Flex>
            </Col>

            <Col span={30}>
                <Flex vertical={true}>

                    <Form.Item label={t("profile.secondLastName") + ":"} name="segundo_apellido" rules={[{required: false,message: t("messageError.emptySecondLastName"),},
                       {min:4, message: t("messageError.minCharSecondLastName")},
                       {max:25, message: t("messageError.maxCharSecondLastName")}
                    ]}>
                        <Input onChange={(e) => setSecondLastName(e.target.value)} style={{marginBottom:margin, width:300}}  placeholder={t("profile.secondLastName")}/>
                    </Form.Item>

                    <Form.Item label={t("profile.username") + ":"} name="user_name" rules={[{required: true,message: t("messageError.emptySerialNumber"),},
                        {min:4, message: t("messageError.minCharUsername")},
                        {max:20, message: t("messageError.maxCharUsername")},
                        {validator:(rule, value, callback) => {
                            if(rule && value){
                                console.log(value);
                                const res = axios.post('http://localhost:3000/api/user/validate', {info : value});
                                res.then((response) => {
                                    if(response.data)
                                        callback(new Error(t("messageError.existUser")));
                                })
                            }
                            
                        }}
                    ]}>
                        <Input onChange={(e) => setUserName(e.target.value)} style={{marginBottom:margin, width:300}} placeholder={t("profile.username")}/>
                    </Form.Item>

                    <Form.Item label='Email:' name="email" rules={[{required: true,message: t("messageError.emptyEmail"),},
                        {validator:(rule, value, callback) => {
                            if(rule && value){
                                const emailValue = value.toLowerCase();
                                if(emailValue.includes('@gmail.com')){
                                    const res = axios.post('http://localhost:3000/api/user/validate', {info : value});
                                    res.then((response) => {
                                    if(response.data)
                                        callback(new Error(t("messageError.existEmail")));
                                })
                                }
                                else{
                                    callback(new Error(t("messageError.extensionGMAIL.COM")));
                                }
                            } 
                        }}
                    ]}>
                        <Input onChange={(e) => setEmail(e.target.value)} style={{marginBottom:margin, width:300}} placeholder={t("profile.email")}/>
                    </Form.Item>

                    <Form.Item label={t("profile.password") + ":"} name="password" rules={[{required: true,message: t("messageError.emptyPassword"),},
                        {min:5, message: t("messageError.minCharPassword")},
                        {max:8, message: t("messageError.maxCharPassword")},
                        {pattern:'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,8}$', message: t("messageError.weakPassord")}
                    ]}>
                        <Input.Password onChange={(e) => setPassword(e.target.value)} style={{marginBottom:margin, width:300}} placeholder={t("profile.password")}/>
                    </Form.Item>
                </Flex>
            </Col>
                
            <Col span={30}>
                <Flex vertical={true}>
                <Form.Item label={t("profile.contactNumber") + ":"} name="num_cont" rules={[{required: true,message: t("messageError.emptyContactNumber"),},
                   {len:8, message: t("messageError.lengthContactNumber")}
                ]}>
                        <Input onChange={(e) => setNumCont(e.target.value)} style={{marginBottom:margin, width:300}} placeholder={t("profile.contactNumber")}/>
                    </Form.Item>

                    <Form.Item label={t("profile.age") + ":"} name="edad" rules={[{required: true,message: t("messageError.emptyAge"),},                      
                    ]}>
                        <InputNumber min={18} max={70} onChange={(value) => setEdad(value)} style={{marginBottom:margin, width:60}} placeholder='Edad'/>
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