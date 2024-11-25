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

// let bannerRef = useRef({})
// let canvasRef = useRef({})

// useEffect(() => {
//   const canvas = canvasRef.current;
//   const banner = bannerRef.current;
//   canvas.width = canvas.offsetWidth;
// canvas.height = canvas.offsetHeight;
// let ctx = canvas.getContext('2d');

// let dots = [];
// let arrayColors = ['#eee', '#545454', '#596d91', '#bb5a68', '#696541'];
// for (let i = 0; i < 50; i++) {
//     dots.push({
//         x: Math.floor(Math.random() * canvas.width),
//         y: Math.floor(Math.random() * canvas.height),
//         size: Math.random() * 3 + 5,
//         color: arrayColors[Math.floor(Math.random() * 5)]
//     })
// }

// const drawDots = () => {
//     dots.forEach(dot => {
//         ctx.fillStyle = dot.color;
//         ctx.beginPath();
//         ctx.arc(dot.x, dot.y,dot.size, 0, Math.PI*2);
//         ctx.fill();
//     })
// }

// drawDots();

// banner.addEventListener('mousemove', (event)=>{
//     ctx.clearRect(0,0,canvas.width, canvas.height);
//     drawDots();
//     let mouse = {
//         x: event.pageX - banner.getBoundingClientRect().left,
//         y: event.y - banner.getBoundingClientRect().top,
//     }

//     dots.forEach(dot => {

//         let distance = Math.sqrt((mouse.x - dot.x)**2 + (mouse.y - dot.y)**2);
//         if(distance < 300){
//             ctx.strokeStyle = dot.color;
//             ctx.lineWidth = 1;
//             ctx.beginPath();
//             ctx.moveTo(dot.x, dot.y);
//             ctx.lineTo(mouse.x, mouse.y);
//             ctx.stroke();
//         }
//     })
// })

// banner.addEventListener('mouseout', () => {
//     ctx.clearRect(0,0,canvas.width, canvas.height);
//     drawDots();
// })
// }, [])


  const [form] = Form.useForm();

  const [abrirModal, setabrirModal] = useState(false);
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();
  const [t] = useTranslation("global");

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const {setUser, setClient} = useContext(GlobalContext);
  const Registrar = async () => {
    
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      user_name: userName,
      password: password
    });

    sessionStorage.setItem('jwt', JSON.stringify(response.data.token));
    if(response.status === 201){
      const tipoUsuario = response.data.user.tipo_usuario;
      setUser(response.data.user);
      if(tipoUsuario === 'Admin'){
        message.success(t("messageSuccess.loginSuccess"))
        navigate('/admin');
      }

      if(tipoUsuario === 'Cliente'){
        const idClient = response.data.user.id_cliente;
        const res = await axios.get(`http://localhost:3000/api/client/sample/${idClient}`);
        if(res.status === 200){
          message.success(t("messageSuccess.loginSuccess"))
          setClient(res.data[0]);
          localStorage.setItem('clientData', JSON.stringify(res.data[0]));
          localStorage.setItem('login', 'true')
          navigate('/home');
        }
      }

      if(tipoUsuario === 'Trabajador'){
        message.success(t("messageSuccess.loginSuccess"))
        navigate('/worker');
      }

      //Guardar la referencia a los usuarios y clientes en caso de que se refresque la pantalla
      if(!tipoUsuario)
        message.info(t("messageError.notExistUser"));
    }

  };

  return (
    <div className="loguin">
       <div className="divForm">
        <Form className="formAnt"
          clearOnDestroy={true}
          name="login"
          initialValues={{username: '', password: ''}}
          style={{
            maxWidth: 360,
          }}
          onFinish={Registrar}
          form={form}
        >
        <Form.Item
          name="username"
          rules={[{required: true,message: t("messageError.emptyUsername"),},
            {}
          ]}>
          <Input onChange={(e) => setUserName(e.target.value)} prefix={<UserOutlined />} placeholder={t("login.username")} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{required: true,message: t("messageError.emptyPassword"),}]}>

          <Input onChange={(e) => setPassword(e.target.value)} prefix={<LockOutlined />} type="password" placeholder={t("login.password")} />

        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{t("login.rememberMe")}</Checkbox>
            </Form.Item>
            <a style={{color:'whitesmoke'}}>{t("login.forgotPassword")}</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="default" htmlType="submit">
            {t("login.loginIn")}
          </Button>
          <a onClick={() => setabrirModal(true)} style={{color:'whitesmoke'}}>{t("login.register")}</a>
        </Form.Item>
      </Form>
       </div>
      <ModalCreateClient isVisible={abrirModal} setVisible={() => setabrirModal(!abrirModal)} />
    </div>
  );
  };


export default Loguin;
