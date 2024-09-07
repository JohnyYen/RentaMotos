import{ Button}from "antd";
import {CarOutlined } from '@ant-design/icons';
import './App.css';
import Operation from "antd/es/transfer/operation";
import axios from 'axios';


const NuevaMoto = ({isVisible, setVisible}) => {

  const [matricula, setMatricula] = useState("");
  const [Color, setColor] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");


  if(!isVisible) return null;

  const handlePetition = (moto) => {
    console.log(moto);
  }
  
  const Modal =(isOpen, closeModal) =>{
    if(!isOpen) return null;
    
      return(
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
        
              <div className="panelBotonesmoto">
        <Button className="Bm1" type="primary" size="large" block >Cancelar
                </Button>
        
                <Button className="Bm2" type="primary"  size="large" block>
                  Aceptar
                </Button>
        </div>
        
        </div>)}



  return (
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

  <form className="formMoto">
    <label htmlFor="matricula">Matricula</label>
    <input onChange={(e) => setMatricula(e.target.value)} placeholder="Ingrese su matricula" id="matricula" name="matricula"/>

    <label htmlFor="color">Color</label>
    <select onChange={(e) => setColor(e.target.value)} name="color" id="color">
      <option value ="1"  >rojo</option>
      <option value ="2">negro</option>
      <option value ="3">azul</option>
      <option value ="4">verde</option>
      <option value ="5">amarillo</option>
      <option value ="6">gris</option>
      <option value ="7">naranja</option>
      <option value ="8">morado</option>
      <option value ="9">neón</option>
      <option value ="10">plateado</option>
      <option value ="11">dorado</option>
    </select>

    <label htmlFor="marca">Marca</label>
    <select onChange={(e) => setMarca(e.target.value)} id="marca" name="marca">

    </select>

    <label htmlFor="modelo">Modelo</label>
    <select onChange={(e) => setModelo(e.target.value)} id="modelo" name="modelo">

    </select>
  </form>
</div>

      <div className="panelBotonesmoto">
        <Button onClick={setVisible} className="Bm1" type="primary" size="large" block >Cancelar
        </Button>

          <Button onClick={() => handlePetition({matricula: matricula, color:Color, cantKm: 0, marca : marca, modelo : modelo, situacion: "Disponible"})} className="Bm2" type="primary"  size="large" block>
            Aceptar
          </Button>
      </div>

</div>
    
  );};



  export default  NuevaMoto ;
