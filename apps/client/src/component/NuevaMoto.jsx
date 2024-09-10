import{ Button, Form, Input,Select, Modal }from "antd";
import {CarOutlined } from '@ant-design/icons';
import './App.css';
import Operation from "antd/es/transfer/operation";
import axios from 'axios';



const NuevaMoto = () => {

  
  const [modal, setModal]= useState (false);
  
  const [contrato, setContrato] = useState({
   matricula: '',
    color:'',
    marca:'',
   modelo:'',
    situacion:'',
  
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
  
  
    return (
  
      <div className="NuevaMoto">
  
  <Button onClick={abrirModal} type="primary" size="large" block> Abrir Modal</Button>
  <Modal 
     className="Modimoto"
     visible = {modal}
     onCancel = {cerrarModal}
     onOk = {accion}
     footer ={[  <div className="panelBotonesmoto">
      <Button onClick={cerrarModal} className="Bm1" type="primary" size="large" block >Cancelar
              </Button>
      
              <Button  onClick={accion}className="Bm2" type="primary"  size="large" block>
                Aceptar
              </Button>
      </div>]}>
  <div className="pantallamoto">
  
  <div style={{ 
          position: 'fixed', 
          top: '20px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
        }} >
        <  CarOutlined  className= "Creamoto"/>
        </div>
  
  <div className="panelCentral">
  
  <Form  >
    <Form.Item  label={<span style={{ color: 'white' }}>Matrícula:</span>} name={"matriculamoto"} >
        <Input placeholder="Ingrese su matrícula"/>
    </Form.Item>
  
  
    <Form.Item label={<span style={{ color: 'white' }}>Color:</span>} name={"colormoto"}>
  <Select  >
    <Operation value ="1"  >rojo</Operation>
    <Operation value ="2">negro</Operation>
    <Operation value ="3">azul</Operation>
    <Operation value ="4">verde</Operation>
    <Operation value ="5">amarillo</Operation>
    <Operation value ="6">gris</Operation>
    <Operation value ="7">naranja</Operation>
    <Operation value ="8">morado</Operation>
    <Operation value ="9">neón</Operation>
    <Operation value ="10">plateado</Operation>
    <Operation value ="11">dorado</Operation>
   
  </Select>
  </Form.Item>
  
  
  
    <Form.Item label={<span style={{ color: 'white' }}>Marca:</span>} name={"marcaMoto"}>
        <Input placeholder="Ingrese la marca"/>
    </Form.Item>
  
  
    <Form.Item label={<span style={{ color: 'white' }}>Modelo:</span>} name={"moodelomoto"}>
        <Input placeholder="Ingrese el modelo"/>
    </Form.Item>
  
  
    <Form.Item label={<span style={{ color: 'white' }}>Situación:</span>} name={"situaciónmoto"}>
  <Select  >
    <Operation value ="1"  >taller</Operation>
    <Operation value ="2">alquilada</Operation>
    <Operation value ="3">disponible</Operation>
   
  </Select>
  </Form.Item>
  
  
  
  
  </Form>
  
  </div>
  
  
      
  
  </div>
  </Modal>
      </div>
    );};
  
  
  
    export default  NuevaMoto ;
  
