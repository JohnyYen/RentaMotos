import{ Button}from "antd";
import {FileDoneOutlined } from '@ant-design/icons';
import { useState} from "react";



  


const NuevoContrato = () => {

const [pagoSeleccionado, setPagoSeleccionado] = useState(null);
  const [seguroSeleccionado, setSeguroSeleccionado] = useState(false);

  const handlePagoChange = (e) => {
    setPagoSeleccionado(e.target.value);
  };

  const handleSeguroChange = (checked) => {
    setSeguroSeleccionado(checked);
  };



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
            <input placeholder="Matricula de la Moto"/>

            <label>Id cliente</label>
            <input placeholder="CI del Cliente"/>

            <label>Fecha de Firma</label>
            <input type="date" placeholder="    "/>

            <label>Fecha de Inicio</label>
            <input type="date"/>
            </div>
            
            <div id="rigth-div">
            <label>Fecha de Fin</label>
            <input type="date"/>

            <label>Forma de Pago</label>
            <select id="forma-pago">

            </select>

            <div className="checkbox">
            <label htmlFor="seguro">Seguro</label>
            <input type="checkbox" name="seguro" id="seguro"></input>
            </div>

            </div>
            
          </form>
        </div>

      <div className="panelBotonescontrato">
<Button className="Bc1" type="primary" size="large" block >Cancelar
        </Button>

        <Button className="Bc2" type="primary"  size="large" block>
          Aceptar
        </Button>
</div>




    </div>



  );};


  export default  NuevoContrato ;