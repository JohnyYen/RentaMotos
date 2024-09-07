import{ Button}from "antd";
import {CarOutlined } from '@ant-design/icons';
<<<<<<< HEAD
import { useState } from "react";
=======
import './App.css';
import Operation from "antd/es/transfer/operation";
>>>>>>> main
import axios from 'axios';


const NuevaMoto = ({isVisible, setVisible}) => {

  const [matricula, setMatricula] = useState("");
  const [Color, setColor] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");

  if(!isVisible) return null;

<<<<<<< HEAD
  const handlePetition = (moto) => {
    console.log(moto);
  }
=======
  const [visible, setVisible] = useState(false);

const Activar =() =>{
  setVisible(true)
  
}
const Desactivar =() =>{
  setVisible(false)
  
}


>>>>>>> main
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
