import{Form, Input, message}from "antd";
import {UserOutlined} from '@ant-design/icons';
import {useState} from "react"
import "./NuevoUsuario";
import NuevoCliente from "./NuevoUsuario";



function Loguin() {
  
    const loguear=()=>{
      message.success("Registro completado");
    }
  
    return (
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
        <button className="buttonLoguin" type="submit" onClick={loguear}>Aceptar</button>
        <button className="linkLoguin">Registrarse</button>
      </div>
    </div>
    )
  }
  
  export default Loguin;