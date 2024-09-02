import{ InputNumber,Button,  Form, Input,Select,Modal }from "antd";
import {UserOutlined} from '@ant-design/icons';
import './App.css';
import Operation from "antd/es/transfer/operation";
import axios from 'axios';




const NuevoCliente = () => {


  const [abrirModal, setabrirModal]= useState (false);
  
  const Modal =(isOpen, closeModal) =>{
    if(!isOpen) return null;
    
      return( <div className="pantalla">
    
        <div style={{ 
                position: 'fixed', 
                top: '20px', 
                left: '50%', 
                transform: 'translateX(-50%)', 
              }} >
              <UserOutlined className= "CreaUsuario"/>
              </div>
        
        
        <div className="panelImputIzquierdo">
        
        <Form  >
          <Form.Item  label={<span style={{ color: 'white' }}>Nombre:</span>} name={"nombreUsuario"} >
              <Input placeholder="Ingrese su nombre"/>
          </Form.Item>
        
          <Form.Item label={<span style={{ color: 'white' }}>Apellido:</span>} name={"apellidoUsuario"}>
              <Input placeholder="Ingrese su apellido"/>
          </Form.Item>
        
        
          <Form.Item label={<span style={{ color: 'white' }}>ID:</span>} name={"ID"}>
              <Input placeholder="Ingrese su ID"/>
          </Form.Item>
        
          <Form.Item label={<span style={{ color: 'white' }}>Municipio:</span>} name={"municipios"}>
        <Select  placeholder = "Seleccione su municipio" >
          <Operation value ="1"  >Playa</Operation>
          <Operation value ="2">PLaza de la Revolución</Operation>
          <Operation value ="3">Centro Habana</Operation>
          <Operation value ="4">La Habana Vieja</Operation>
          <Operation value ="5">Regla</Operation>
          <Operation value ="6">Habana del Este</Operation>
          <Operation value ="7">Guanabacoa</Operation>
          <Operation value ="8">San Miguel del Padrón</Operation>
          <Operation value ="9">Diez de Octubre</Operation>
          <Operation value ="10">Cerro</Operation>
          <Operation value ="11">Marianao</Operation>
          <Operation value ="12">La Lisa</Operation>
          <Operation value ="13">Boyeros</Operation>
          <Operation value ="14">Arroyo Naranjo</Operation>
          <Operation value ="15">Cotorro</Operation>
        </Select>
        </Form.Item>
        </Form>
        
        </div>
        
        
        <div className="panelImputDerecho">
        
        <Form>
        
        <Form.Item label={<span style={{ color: 'white' }}>Sexo:</span>} name={"sexo"}>
        <Select  >
          <Operation value ="1"  >Masculino</Operation>
          <Operation value ="2">Femenino</Operation>
        </Select>
        </Form.Item>
        
        
        <Form.Item label={<span style={{ color: 'white' }}>Edad:</span>} name={"edad"}>
        <InputNumber placeholder="Ingrese su edad" min={16}/>
        </Form.Item>
        
        </Form>
        
        
        
        </div>
        
        
        <div className="panelBotones">
        <Button  className="B1" type="primary" size="large" block >Cancelar
                </Button>
        
                <Button  onClick={closeModal}  className="B2" type="primary"  size="large" block>
                  Aceptar
                </Button>
        </div>
       
       
        </div>)
    }
  
    
  
  
  
      return (
        <div className="NuevoCliente" >
         
     <Modal isOpen ={abrirModal} closeModal = {()=>setabrirModal(false)}  />
       </div>
    
      );};
    
      export default  NuevoCliente ;