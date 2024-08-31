import{ InputNumber,Button,  Form, Input,Select }from "antd";
import {UserOutlined} from '@ant-design/icons';
import Operation from "antd/es/transfer/operation";



const NuevoCliente = () => {

    return (
  
  <div className="pantalla">
  
  <div style={{ 
          position: 'fixed', 
          top: '20px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
        }} >
        <UserOutlined className= "CreaUsuario"/>
        </div>
  
  
  <div className="panelImputIzquierdo">
  <form>
    <div id="left-div">
    <label htmlFor="userName">Nombre de Usuario</label>
      <input type="text" placeholder="Introduce su nombre de usuario" id="userName" name="userName"/>
    
      <label htmlFor="email">Correo Electrónico</label>
      <input type="email" placeholder="Correo Electrónico" name="email" id="email"/>

      <label>Nombre</label>
      <input placeholder="Introduce su nombre"/>

      <label>Primer Apellido</label>
      <input placeholder="Introduce su apellido"/>

      <label>CI</label>
      <input placeholder="Introduce su CI"/>
    </div>

    <div id="rigth-div">
    <label>Numero Contacto</label>
      <input placeholder="Introduce su numero Contacto"/>

      <label>Contraseña</label>
      <input placeholder="Introduce su Contraseña"/>


      <label>Sexo</label>
      <select>
        <option>F</option>
        <option>M</option>
      </select>

      <label>Municipio</label>
      <select>
        <option>Centro Habana</option>
        <option>Habana Vieja</option>
        <option>Vedado</option>
        <option>Plaza de la Revolución</option>
        <option>10 de Octubre</option>
        <option>Playa</option>
        <option>Cerro</option>
        <option>San Miguel del Padrón</option>
        <option>Lawton</option>
        <option>Cotorro</option>
      </select>

      <label>Edad</label>
      <input type="number"  min={16} max={70} placeholder="Introduce su Edad"/>
    </div>

      

  </form>
  
  
  </div>
  
    
  <div className="panelBotones">
          <Button className="B1" type="primary" size="large" block >Cancelar
          </Button>
  
          <Button className="B2" type="primary"  size="large" block>
            Aceptar
          </Button>
  </div>
  
  
  </div>
    );};
  
    export default  NuevoCliente ;
  