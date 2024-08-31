import{ Button, Form, Input,Select }from "antd";
import {CarOutlined } from '@ant-design/icons';
import './App.css';
import Operation from "antd/es/transfer/operation";
import axios from 'axios';



const NuevaMoto = () => {


  const [visible, setVisible] = useState(false);

const Activar =() =>{
  setVisible(true)
  
}
const Desactivar =() =>{
  setVisible(false)
  
}


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

</div>
    
  );};



  export default  NuevaMoto ;
