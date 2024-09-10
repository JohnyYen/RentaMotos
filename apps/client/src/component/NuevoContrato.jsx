import{ InputNumber,Button,DatePicker,Switch , Form, Input, Radio, Modal }from "antd";
import {FileDoneOutlined } from '@ant-design/icons';
import './App.css';
import { useState} from "react";
import axios from 'axios';


  

const NuevoContrato = () => {


  const [modal, setModal]= useState (false);
  
  const [contrato, setContrato] = useState({
   fechaFirma: '',
    fechaInicio:'',
    fechaFin:'',
   cid:'',
    tarifa:'',
    kms:'',
    formapago:'',
  });
  
  const abrirModal =() =>{
  setModal(true);
  }
  
  const cerrarModal =() =>{
    setModal(false);
    }
    
  
  const accion=() =>{
    cerrarModal();
  };
  
  
  
  const [pagoSeleccionado, setPagoSeleccionado] = useState(null);
    const [seguroSeleccionado, setSeguroSeleccionado] = useState(false);
  
    const handlePagoChange = (e) => {
      setPagoSeleccionado(e.target.value);
    };
  
    const handleSeguroChange = (checked) => {
      setSeguroSeleccionado(checked);
    };
  
  
  
    return (
  <div className = "NuevoContrato">
   
    <Button onClick={abrirModal} type="primary" size="large" block> Abrir Modal</Button>
  <Modal 
     className="Modi"
     visible = {modal}
     onCancel = {cerrarModal}
     onOk = {accion}
     footer ={[
           <div className="panelBotonescontrato">
  <Button onClick={cerrarModal} className="Bc1" type="primary" size="large" block >Cancelar
          </Button>
  
          <Button  onClick={accion}className="Bc2" type="primary"  size="large" block>
            Aceptar
          </Button>
  </div>]}>
  
      <div className="pantallacontrato">
  
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
  
  </div>
  </Modal>
      </div>
  
  
    );};
  
  
    export default  NuevoContrato ;
  