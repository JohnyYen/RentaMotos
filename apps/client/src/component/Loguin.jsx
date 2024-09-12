import { Button, Checkbox, Divider, Flex, Form, Input, message, Modal } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "../App.css";
import "./NuevoUsuario";
import axios from "axios";
import { useContext, useState } from "react";
import ModalCreateClient from "../components/ModalCreateClient";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { useTranslation } from "react-i18next";

function Loguin() {
  const [abrirModal, setabrirModal] = useState(false);
  const navigate = useNavigate();
  const [t] = useTranslation("global");

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const {setUser, setClient} = useContext(GlobalContext);
  const Registrar = async () => {
    
    const response = await axios.post('http://localhost:3000/api/user', {
      userName: userName,
      password: password
    });

    if(response.status === 201){
      const tipoUsuario = response.data.tipo_usuario;
      
      if(tipoUsuario === 'Admin'){
        message.success('Logueado con Exito')
        navigate('/admin');
      }

      if(tipoUsuario === 'Cliente'){
        const idClient = response.data.id_cliente;
        const res = await axios.get(`http://localhost:3000/api/client/sample/${idClient}`);
        if(res.status === 200){
          message.success('Logueado con Exito')
          setUser(response.data);
          setClient(res.data[0]);
          localStorage.setItem('clientData', JSON.stringify(res.data[0]));
          navigate('/client');
        }
      }

      if(tipoUsuario === 'Trabajador'){
        message.success('Logueado con Exito')
        setUser(response.data);
        navigate('/worker');
      }

      //Guardar la referencia a los usuarios y clientes en caso de que se refresque la pantalla
      localStorage.setItem('userData', JSON.stringify(response.data));
        
      if(!tipoUsuario)
        message.info('Este usuario no existe');
    }

    return (
      <div className="loguin">
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <UserOutlined className="iconoUsuario" />
        </div>

        <div>
          <Form labelCol={{span: 8}}  wrapperCol={{span: 16}} autoComplete="off" initialValues={{remember: false,}} onFinish={Registrar} >
            <Form.Item
              label={t("login.username")}
              name={"user"}
              rules={[{required:true, message:'Por favor introduce el usuario'}]}
>
              <Input onChange={(e) => setUserName(e.target.value)} placeholder="Ingrese su usuario" />
            </Form.Item>

            <Form.Item
              label={t("login.password")}
              name={"password"}
              rules={[{required:true, message:'Por favor introduce la contraseña'}]}>
              <Input onChange={(e) => setPassword(e.target.password)} placeholder="Ingrese su contraseña" />
            </Form.Item>

            <Form.Item>
              <Button type="default" htmlType="submit">
              {t("login.accept")}
              </Button>
            </Form.Item>
         
            <Form.Item>
              <Button onClick={() => setabrirModal(true)} type="link">
              {t("login.register")}
              </Button>
            </Form.Item>
          </Form>
        </div>

        <ModalCreateClient isVisible={abrirModal} setVisible={() => setabrirModal(!abrirModal)} />
      </div>
    );
  };

  return (
    <div className="loguin">
       <div className="divForm">
        <Form className="formAnt"
          name="login"
          initialValues={{
            remember: true,
          }}
          style={{
            maxWidth: 360,
          }}
          onFinish={Registrar}
        >
        <Form.Item
          name="username"
          rules={[{required: true,message: 'Please input your Username!',},
          ]}>
          <Input onChange={(e) => setUserName(e.target.value)} prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{required: true,message: 'Please input your Password!',},]}>

          <Input onChange={(e) => setPassword(e.target.value)} prefix={<LockOutlined />} type="password" placeholder="Password" />

        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a style={{color:'whitesmoke'}}>Forgot password</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="default" htmlType="submit">
            Log in
          </Button>
          or <a onClick={() => setabrirModal(true)} style={{color:'whitesmoke'}}>Register now!</a>
        </Form.Item>
      </Form>

       </div>
      <ModalCreateClient isVisible={abrirModal} setVisible={() => setabrirModal(!abrirModal)} />
    </div>
  );
  };


export default Loguin;
