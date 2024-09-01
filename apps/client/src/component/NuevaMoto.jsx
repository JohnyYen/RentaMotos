import{ Button, Form, Input,Select }from "antd";
import {CarOutlined } from '@ant-design/icons';
import Operation from "antd/es/transfer/operation";



const NuevaMoto = () => {
  

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
    <input placeholder="Ingrese su matricula" id="matricula" name="matricula"/>

    <label htmlFor="color">Color</label>
    <select name="color" id="color">
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
    <select id="marca" name="marca">

    </select>

    <label htmlFor="modelo">Modelo</label>
    <select id="modelo" name="modelo">

    </select>
  </form>
</div>

      <div className="panelBotonesmoto">
        <Button className="Bm1" type="primary" size="large" block >Cancelar
        </Button>

          <Button className="Bm2" type="primary"  size="large" block>
            Aceptar
          </Button>
      </div>

</div>
    
  );};



  export default  NuevaMoto ;
