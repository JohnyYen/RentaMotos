import{ Button}from "antd";
import {FileDoneOutlined } from '@ant-design/icons';
import { useState} from "react";
import axios from 'axios';

  


<<<<<<< HEAD
const NuevoContrato = ({isVisible, setVisible}) => {
  
  
  const [Matricula, setMatricula] = useState("");
  const [Id, setId] = useState("");
  const [dateEnd, setDateEnd] = useState(new Date());
  const [dateBegin, setDateBegin] = useState(new Date());
  const [dateFirma, setDateFirma] = useState(new Date());
  const [isChecked, setIsChecked] = useState(false);
  const [formaPago, setFormaPago] = useState("");
=======
const NuevoContrato = () => {


  const [visible, setVisible] = useState(false);

  const Activar =() =>{
    setVisible(true)
    
  }
  const Desactivar =() =>{
    setVisible(false)
    
  }


const [pagoSeleccionado, setPagoSeleccionado] = useState(null);
  const [seguroSeleccionado, setSeguroSeleccionado] = useState(false);

  const handlePagoChange = (e) => {
    setPagoSeleccionado(e.target.value);
  };

  const handleSeguroChange = (checked) => {
    setSeguroSeleccionado(checked);
  };
>>>>>>> main

  if (!isVisible) return null;


  const handlePetition = async (contract) => {
    console.log(contract);
  }
  return (

    <div className="pantallacontrato">

      <div style={{ 
          position: 'fixed', 
          top: '20px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
        }} >
        <FileDoneOutlined  className= "Creamoto"/>
      </div>

        <div>
          <form id="nuevo-contrato-form">
            <div id="left-div">
            <label>Matricula</label>
            <input onChange={(e) => setMatricula(e.target.value)} placeholder="Matricula de la Moto"/>

            <label>Id cliente</label>
            <input onChange={(e) => setId(e.target.value)} placeholder="CI del Cliente"/>

            <label>Fecha de Firma</label>
            <input onChange={(e) => setDateFirma(e.target.value)} type="date" placeholder="    "/>

            <label>Fecha de Inicio</label>
            <input onChange={(e) => setDateBegin(e.target.value)} type="date"/>
            </div>
            
            <div id="rigth-div">
            <label>Fecha de Fin</label>
            <input onChange={(e) => setDateEnd(e.target.value)} type="date"/>

            <label>Forma de Pago</label>
            <select onChange={(e) => setFormaPago(e.target.value)} id="forma-pago">

            </select>

            <div className="checkbox">
              <label htmlFor="seguro">Seguro</label>
              <input onChange={(e) => setIsChecked(e.target.value)} type="checkbox" name="seguro" id="seguro"></input>
            </div>
            </div>
          </form>
        </div>
      <div className="panelBotonescontrato">
        <Button onClick={setVisible} className="Bc1" type="primary" size="large" block >Cancelar
        </Button>

        <Button onClick={() => handlePetition({idCliente:Id, matricula: Matricula, beginDate : dateBegin, endDate : dateEnd, firmaDate : dateFirma, formaPago : formaPago, seguro : isChecked, diasProrroga: 0})} className="Bc2" type="primary"  size="large" block>
          Aceptar
        </Button>
      </div>
    </div>



  );};


  export default  NuevoContrato ;