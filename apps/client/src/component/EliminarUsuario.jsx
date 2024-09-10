import{ Button, Modal,useEffect, useState }from "antd";
import "../App.css";
import axios from 'axios';

<<<<<<< HEAD
const EliminarUsuario = () => {
    return (
=======




const EliminarUsuario = (nombreU) => {

<<<<<<< HEAD
  const [visible, setVisible] = useState(false);

const Activar =() =>{
  setVisible(true)
>>>>>>> main
=======
  const [abrirModal, setabrirModal]= useState (false);
>>>>>>> 624c6d72aa96f741ef2b5f24673da529581d2ed9
  
  const Modal =(isOpen, closeModal) =>{
    if(!isOpen) return null;
    
      return(
        <div className="Eliminar">
       
            <div className="Mensaje" >
              ¿Seguro que desea eliminar este usuario?
            </div>
      
            <div  className="Botones"  >
              <Button onCick ={Desactivar} className="B1" type="primary" htmlType="submit" block >Cancelar
              </Button>
      
              <Button onCick = {Eusuario(nombreU)} className="B2"
                type="primary" htmlType="submit" block
      
              >
                Aceptar
              </Button>
            </div>
        
      
        </div>  )};

const Eusuario = async(nombreU) =>{

  try{
  const apiUrl = `http://localhost:3000/api/user?${nombreU} `
  ;
  const response = await axios.delete(apiUrl);
  alert('Elemento eliminado con éxito:', response.data);
}catch(error){alert('Error al eliminar el elemento:', error);}
return(Desactivar)};


    return (
      <div className="Loguin">
      <Modal isOpen ={abrirModal} closeModal = {()=>setabrirModal(false)}  />
    </div>
    );
  };
  
  export default  EliminarUsuario;