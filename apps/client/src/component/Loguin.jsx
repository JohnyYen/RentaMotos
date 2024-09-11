import { Button, Divider, Form, Input, message, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
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

    console.log(response.data);

    if(response.status === 201){
      const tipoUsuario = response.data.tipo_usuario;
      
      console.log(response.data);
      console.log(tipoUsuario);

      if(tipoUsuario === 'Admin')
        navigate('/admin');

      if(tipoUsuario === 'Cliente'){
        const idClient = response.data.id_cliente;
        const res = await axios.get(`http://localhost:3000/api/client/sample/${idClient}`);
        if(res.status === 200){
          setUser(response.data);
          setClient(res.data[0]);
          navigate('/client');
        }
      }

      if(tipoUsuario === 'Trabajador'){
        setUser(response.data);
        navigate('/worker');
      }
        
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

        <div className="Registro">
          <Form className="miLoguin">
            <Form.Item
              label={<span style={{ color: "white" }}>{t("login.username")}</span>}
              name={"miUsuario"}
            >
              <Input placeholder="Ingrese su usuario" />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: "white" }}>{t("login.password")}</span>}
              name={"micontraseña"}
            >
              <Input placeholder="Ingrese su contraseña" />
            </Form.Item>
          </Form>
        </div>

        <div className="Alternativa">
          <Button type="primary" htmlType="submit" block>
            {t("login.accept")}
          </Button>
          <div>
            <Button onClick={() => setabrirModal(true)} type="link">
            {t("login.register")}
            </Button>
            {/* <NuevoCliente visible={visibleNuevoCliente} /> */}
          </div>
        </div>

        <ModalCreateClient isVisible={abrirModal} setVisible={() => setabrirModal(!abrirModal)} />
      </div>
    );
  };

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

      <div className="Registro">
        <Form className="miLoguin">
          <Form.Item
            label={<span style={{ color: "white" }}>Usuario</span>}
            name={"miUsuario"}
          >
            <Input onChange={(e) => setUserName(e.target.value)} placeholder="Ingrese su usuario o contraseña" />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: "white" }}>Contraseña</span>}
            name={"micontraseña"}
          >
            <Input onChange={(e) => setPassword(e.target.value)} placeholder="Ingrese su contraseña" />
          </Form.Item>
        </Form>
      </div>

      <div className="Alternativa">
        <Button type="primary" htmlType="submit" onClick={Registrar}>
          Aceptar
        </Button>
        <div>
          <Button onClick={() => setabrirModal(true)} type="link">
            Registrarse
          </Button>
          {/* <NuevoCliente visible={visibleNuevoCliente} /> */}
        </div>
      </div>

      <ModalCreateClient isVisible={abrirModal} setVisible={() => setabrirModal(!abrirModal)} />
    </div>
  )
  };


export default Loguin;
