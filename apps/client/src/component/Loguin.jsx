import{ Button, Divider, Form, Input, message,Modal }from "antd";
import {UserOutlined} from '@ant-design/icons';
import "../App.css";
import "./NuevoUsuario";
import { BrowserRouter, Link, useNavigate } from "react-router-dom";
import AppRoutes from "../components/AppRoutes";
import UserAdmin from "../pages/UserPages/UserAdmin";


function Loguin() {
    const navigate = useNavigate();

    const loguear=()=>{
      message.success("Registro completado");
    }
    
    const handleSubmit = (values) => {
      if(values['contraseña']==='loca')
        <Link to='/userAdmin' />
      else
        <Link to="/userClient"></Link>
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
  
      <Form className="miLoguin" onFinish={handleSubmit} >
    <Form.Item  label={<span style={{ color: 'white' }}>Usuario</span>} name='usuario' >
        <Input placeholder="Ingrese su usuario"/>
    </Form.Item>
  
    <Form.Item label={<span style={{ color: 'white' }}>Contraseña</span>} name='contraseña'>
        <Input placeholder="Ingrese su contraseña"/>
    </Form.Item>
    <Form.Item>
      <Button block type="primary" htmlType="submit" >Acpetar</Button>
    </Form.Item>
  </Form>
    </div>
  
    <div className="Alternativa">
    
    <Button onClick={loguear} type="primary" htmlType="submit" block>Aceptar</Button>

   <Button type="link">Registrarse </Button>
  
    </div>
    </div>
  }
  
  export default Loguin;