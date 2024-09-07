import{ Button}from "antd";
import {UserOutlined} from '@ant-design/icons';
<<<<<<< HEAD
=======
import Operation from "antd/es/transfer/operation";
>>>>>>> 624c6d72aa96f741ef2b5f24673da529581d2ed9
import axios from 'axios';
import { useState } from "react";


const NuevoCliente = ({visible, setVisible}) => {

  //User
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [ci, setCi] = useState("");

  //Client
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [sex, setSex] = useState("");
  const [mun, setMun] = useState("");
  const [numCont, setNumCont] = useState("");

<<<<<<< HEAD
  //Municipios
  const [munList, setMunList] = useState([]);

  axios.get("http://localhost:3000/api/mun").then((res) => setMunList(res.data)).catch((error) => console.log(error));

  if (!visible) return null;

  const handlePetition = async (userInfo, client) => {
    console.log(client);
    console.log(await axios.post('http://localhost:3000/api/user/client', userInfo));
    
  }
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
      <input onChange={(e) => setUser(e.target.value)} type="text" placeholder="Introduce su nombre de usuario" id="userName" name="userName"/>
    
      <label htmlFor="email">Correo Electrónico</label>
      <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Correo Electrónico" name="email" id="email"/>

      <label>Nombre</label>
      <input onChange={(e) => setName(e.target.value)} placeholder="Introduce su nombre"/>

      <label>Primer Apellido</label>
      <input onChange={(e) => setLastName(e.target.value)} placeholder="Introduce su apellido"/>

      <label>CI</label>
      <input onChange={(e) => setCi(e.target.value)} placeholder="Introduce su CI"/>
    </div>

    <div id="rigth-div">
    <label>Numero Contacto</label>
      <input onChange={(e) => setNumCont(e.target.value)} placeholder="Introduce su numero Contacto"/>

      <label>Contraseña</label>
      <input onChange={(e) => setPassword(e.target.value)} placeholder="Introduce su Contraseña"/>


      <label>Sexo</label>
      <select onChange={(e) => setSex(e.target.value)}>
        <option>F</option>
        <option>M</option>
      </select>

      <label>Municipio</label>
      <select onChange={(e) => setMun(e.target.value)}>
        {munList.map((item, i) => (
          <option key={i}>{item}</option>
        ))}
      </select>

      <label>Edad</label>
      <input onChange={(e) => setAge(e.target.value)} type="number"  min={16} max={70} placeholder="Edad"/>
    </div>
  </form>
  </div>

  <div className="panelBotones">
          <Button onClick={setVisible} className="B1" type="primary" size="large" block >Cancelar
          </Button>
  
          <Button
           onClick={() => handlePetition({user_name:user, password:password, email:email, id: ci}, 
            {idCliente:ci, nombre:name, segNombre:name, primApellido:lastName, segApellido: lastName, edad:age, municipio:mun, sexo:sex, numcont:numCont}
           )}
            className="B2" type="primary"  size="large" block>
            Aceptar
          </Button>
  </div>
  
 
  </div>

    );};
  
    export default  NuevoCliente ;
  
=======

  const [abrirModal, setabrirModal]= useState (false);
  
  const Modal =(isOpen, closeModal) =>{
    if(!isOpen) return null;
    
      return( <div className="pantalla">
    
        <div style={{ 
                position: 'fixed', 
                top: '20px', 
                left: '50%', 
                transform: 'translateX(-50%)', 
              }} >
              <UserOutlined className= "CreaUsuario"/>
              </div>
        
        
        <div className="panelImputIzquierdo">
        
        <Form  >
          <Form.Item  label={<span style={{ color: 'white' }}>Nombre:</span>} name={"nombreUsuario"} >
              <Input placeholder="Ingrese su nombre"/>
          </Form.Item>
        
          <Form.Item label={<span style={{ color: 'white' }}>Apellido:</span>} name={"apellidoUsuario"}>
              <Input placeholder="Ingrese su apellido"/>
          </Form.Item>
        
        
          <Form.Item label={<span style={{ color: 'white' }}>ID:</span>} name={"ID"}>
              <Input placeholder="Ingrese su ID"/>
          </Form.Item>
        
          <Form.Item label={<span style={{ color: 'white' }}>Municipio:</span>} name={"municipios"}>
        <Select  placeholder = "Seleccione su municipio" >
          <Operation value ="1"  >Playa</Operation>
          <Operation value ="2">PLaza de la Revolución</Operation>
          <Operation value ="3">Centro Habana</Operation>
          <Operation value ="4">La Habana Vieja</Operation>
          <Operation value ="5">Regla</Operation>
          <Operation value ="6">Habana del Este</Operation>
          <Operation value ="7">Guanabacoa</Operation>
          <Operation value ="8">San Miguel del Padrón</Operation>
          <Operation value ="9">Diez de Octubre</Operation>
          <Operation value ="10">Cerro</Operation>
          <Operation value ="11">Marianao</Operation>
          <Operation value ="12">La Lisa</Operation>
          <Operation value ="13">Boyeros</Operation>
          <Operation value ="14">Arroyo Naranjo</Operation>
          <Operation value ="15">Cotorro</Operation>
        </Select>
        </Form.Item>
        </Form>
        
        </div>
        
        
        <div className="panelImputDerecho">
        
        <Form>
        
        <Form.Item label={<span style={{ color: 'white' }}>Sexo:</span>} name={"sexo"}>
        <Select  >
          <Operation value ="1"  >Masculino</Operation>
          <Operation value ="2">Femenino</Operation>
        </Select>
        </Form.Item>
        
        
        <Form.Item label={<span style={{ color: 'white' }}>Edad:</span>} name={"edad"}>
        <InputNumber placeholder="Ingrese su edad" min={16}/>
        </Form.Item>
        
        </Form>
        
        
        
        </div>
        
        
        <div className="panelBotones">
        <Button  className="B1" type="primary" size="large" block >Cancelar
                </Button>
        
                <Button  onClick={closeModal}  className="B2" type="primary"  size="large" block>
                  Aceptar
                </Button>
        </div>
       
       
        </div>)
    }
  
    
  
  
  
      return (
        <div className="NuevoCliente" >
         
     <Modal isOpen ={abrirModal} closeModal = {()=>setabrirModal(false)}  />
       </div>
    
      );};
    
      export default  NuevoCliente ;
>>>>>>> 624c6d72aa96f741ef2b5f24673da529581d2ed9
