import{ Button, Divider, Form, Input, message }from "antd";
import {UserOutlined} from '@ant-design/icons';
import "../App.css";



function loguin() {
  
    const loguear=()=>{
      message.success("Registro completado");
    }
  
    return <div className="loguin">
  
  
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
    
    <Button onClick={loguear} type="primary" htmlType="submit" block>Aceptar</Button>
  <Divider style={{borderColor: "white"}}><span style={{ color: 'white', fontSize: '0.8em' }}>Registrarse </span></Divider>
  
    </div>
  
    </div>
  }
  
  export default loguin;