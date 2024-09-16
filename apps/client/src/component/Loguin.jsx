import { Button, Checkbox, Divider, Flex, Form, Input, message, Modal } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "../App.css";
import "./NuevoUsuario";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import ModalCreateClient from "../components/ModalCreateClient";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { useTranslation } from "react-i18next";


function Loguin() {

let bannerRef = useRef({})
let canvasRef = useRef({})

useEffect(() => {
  const canvas = canvasRef.current;
  const banner = bannerRef.current;
  canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
let ctx = canvas.getContext('2d');

let dots = [];
let arrayColors = ['#eee', '#545454', '#596d91', '#bb5a68', '#696541'];
for (let i = 0; i < 50; i++) {
    dots.push({
        x: Math.floor(Math.random() * canvas.width),
        y: Math.floor(Math.random() * canvas.height),
        size: Math.random() * 3 + 5,
        color: arrayColors[Math.floor(Math.random() * 5)]
    })
}

const drawDots = () => {
    dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y,dot.size, 0, Math.PI*2);
        ctx.fill();
    })
}

drawDots();

banner.addEventListener('mousemove', (event)=>{
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawDots();
    let mouse = {
        x: event.pageX - banner.getBoundingClientRect().left,
        y: event.y - banner.getBoundingClientRect().top,
    }

    dots.forEach(dot => {

        let distance = Math.sqrt((mouse.x - dot.x)**2 + (mouse.y - dot.y)**2);
        if(distance < 300){
            ctx.strokeStyle = dot.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    })
})

banner.addEventListener('mouseout', () => {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawDots();
})
}, [])


  const [form] = Form.useForm();
  form.resetFields();


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

  };

  return (
    <main className="banner" ref={bannerRef}>
      <div className="loguin">
       <div className="divForm">
        <Form className="formAnt"
          clearOnDestroy={true}
          name="login"
          style={{
            maxWidth: 360,
          }}
          onFinish={Registrar}
          form={form}
        >
        <Form.Item
          name="username"
          rules={[{required: true,message: 'Please input your Username!',},
            {}
          ]}>
          <Input onChange={(e) => setUserName(e.target.value)} prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{required: true,message: 'Please input your Password!',}]}>

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
    <canvas id="dotsCanvas" ref={canvasRef}></canvas>
    </main>
  );
  };


export default Loguin;
