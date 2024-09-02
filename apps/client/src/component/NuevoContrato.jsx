import{ InputNumber,Button,DatePicker,Switch , Form, Input, Radio }from "antd";
import {FileDoneOutlined } from '@ant-design/icons';
import './App.css';
import { useState} from "react";
import axios from 'axios';


  


const NuevoContrato = () => {

  const [abrirModal, setabrirModal]= useState (false);
  
  const Modal =(isOpen, closeModal) =>{
    if(!isOpen) return null;
    
      return(<div className="pantallacontrato">

        <div style={{ 
                position: 'fixed', 
                top: '20px', 
                left: '50%', 
                transform: 'translateX(-50%)', 
              }} >
              <FileDoneOutlined  className= "Creamoto"/>
              </div>
        
        
        <div className="panelIzquierdo">
        
        <Form  >
          <Form.Item  label={<span style={{ color: 'white' }}>Fecha de firma:</span>} name={"matriculamoto"} >
              <DatePicker picker="date"/>
          </Form.Item>
        
          <Form.Item  label={<span style={{ color: 'white' }}>Fecha de inicio:</span>} name={"matriculamoto"} >
              <DatePicker picker="date"/>
          </Form.Item>
        
          <Form.Item  label={<span style={{ color: 'white' }}>Fecha de fin:</span>} name={"matriculamoto"} >
              <DatePicker picker="date"/>
          </Form.Item>
        
        
        </Form>
        
        </div>
        
        
        
        <div className="panelDerecho">  
        <Form>
        
        <Form.Item  label={<span style={{ color: 'white' }}>Modificar ID:</span>} name={"matriculamoto"} >
              <Input placeholder="nuevo ID"/>
          </Form.Item>
        
        </Form>
        
        <div className="panelDermini">
        <Form>
        
        <Form.Item  label={<span style={{ color: 'white' }}>Tarifa:</span>} name={"$"} >
              <Input placeholder="Ingrse la tarifa"/>
          </Form.Item>
        
          <Form.Item  label={<span style={{ color: 'white' }}> Kilómetros:</span>} name={"km"} >
              <InputNumber placeholder="Ingrese los kilómetros" min={0}/>
          </Form.Item>
        
        </Form>
        </div>
        
        </div>
        
        <div className="panelCentral">
          <Form>
        <Form.Item  label={<span style={{ color: 'white' }}> Forma de pago:</span>} name={"pago"} >
              
              <Radio.Group onChange={handlePagoChange} value={pagoSeleccionado}>
                <Radio style={{ color: 'white' }} value="efectivo">Efectivo</Radio>
                <Radio style={{ color: 'white' }} value="tarjeta">Tarjeta</Radio>
                <Radio style={{ color: 'white' }} value="cheque">Cheque</Radio>
              </Radio.Group>
          </Form.Item>
          <Form.Item  label={<span style={{ color: 'white' }}> Seguro:</span>} name={"seguro"} >
              <Switch checked={seguroSeleccionado} onChange={handleSeguroChange} />
              </Form.Item>
        </Form>
        </div>
        
        
        
        
        
              <div className="panelBotonescontrato">
        <Button className="Bc1" type="primary" size="large" block >Cancelar
                </Button>
        
                <Button className="Bc2" type="primary"  size="large" block>
                  Aceptar
                </Button>
        </div>
        
        
        
        
            </div>)}


const [pagoSeleccionado, setPagoSeleccionado] = useState(null);
  const [seguroSeleccionado, setSeguroSeleccionado] = useState(false);

  const handlePagoChange = (e) => {
    setPagoSeleccionado(e.target.value);
  };

  const handleSeguroChange = (checked) => {
    setSeguroSeleccionado(checked);
  };



  return (

    <div className="NuevoContrato">
      <Modal isOpen ={abrirModal} closeModal = {()=>setabrirModal(false)}  />
    </div>



  );};


  export default  NuevoContrato ;