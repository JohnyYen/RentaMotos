import{Form, Input, message}from "antd";
import {UserOutlined} from '@ant-design/icons';
import {useState} from "react"
import "./NuevoUsuario";
<<<<<<< HEAD
import NuevoCliente from "./NuevoUsuario";
=======
import axios from 'axios';
import {NuevoCliente} from "./NuevoUsuario";
>>>>>>> main



function Loguin() {
<<<<<<< HEAD
  
    const [visible, setVisible] = useState(false);

    const handleVisibility = () => {
      setVisible(!visible);
    }

    const loguear=()=>{
      message.success("Bienvenido");
    }
  
    return (
      <>
          <div className="loguin">
    
    
    <div style={{ 
      position: 'fixed', 
      top: '20px', 
      left: '50%', 
      transform: 'translateX(-50%)', 
    }} >
      <UserOutlined className= "iconoUsuario"/>
    </div>



  <div className="Registro">

    <Form className="miLoguin"  >
      <Form.Item>
        <label className="labelLoguin">Usuario</label>
        <Input placeholder="Ingrese su usuario" className="inputLoguin userInput"/>
      </Form.Item>

      <Form.Item>
          <label className="labelLoguin">Contraseña</label>
          <Input placeholder="Ingrese su contraseña" className="inputLoguin"/>
      </Form.Item>

    </Form>
  </div>

  <div className="Alternativa">
    <button onClick={loguear}  className="buttonLoguin" type="submit">Aceptar</button>
    <button onClick={() => setVisible(true)} className="linkLoguin">Registrarse</button>
  </div>
  </div>
        <NuevoCliente setVisible={handleVisibility} visible={visible}/>
      </>
=======


  const [visibleNuevoCliente, setVisibleNuevoCliente] = useState(false);

  const Registrar= () => {
    setVisibleNuevoCliente(true);
  };
    return (<div className="loguin">
  
  
        <div style={{ 
          position: 'fixed', 
          top: '20px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
        }} >
        <UserOutlined className= "iconoUsuario"/>
        </div>
  
  
  
    <div className="Registro">
  
      <Form className="miLoguin"  >
    <Form.Item  label={<span style={{ color: 'white' }}>Usuario</span>} name={"miUsuario"} >
        <Input placeholder="Ingrese su usuario"/>
    </Form.Item>
  
    <Form.Item label={<span style={{ color: 'white' }}>Contraseña</span>} name={"micontraseña"}>
        <Input placeholder="Ingrese su contraseña"/>
    </Form.Item>
  
  </Form>
    </div>
  
    <div className="Alternativa">
    
    <Button  type="primary" htmlType="submit" block>Aceptar</Button>
<div>
   <Button onClick={Registrar} type="link" >Registrarse </Button>
   <NuevoCliente visible={visibleNuevoCliente} />
  </div>
    </div>
  
    </div>
>>>>>>> main
    )
  }
  
  export default Loguin;