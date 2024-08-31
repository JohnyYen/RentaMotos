import{ Button, Divider, Form, Input, message,Modal }from "antd";
import {UserOutlined} from '@ant-design/icons';
import "../App.css";
import "./NuevoUsuario";
import axios from 'axios';
import {NuevoCliente} from "./NuevoUsuario";



function Loguin() {


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
    )
  }
  
  export default Loguin;