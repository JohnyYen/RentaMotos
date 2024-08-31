import{ Button,useEffect, useState,Modal }from "antd";
import "../App.css";
import axios from 'axios';

const EliminarMoto = (idmoto) => {
  const [abrirModal, setabrirModal]= useState (false);
  
  const Modal =(isOpen, closeModal) =>{
    if(!isOpen) return null;
    
      return(    <div className="Eliminar1">
    
        <div className="Mensaje1" >
          ¿Seguro que desea eliminar esta moto?
        </div>
  
        <div  className="Botones1"  >
          <Button className="B11" type="primary" htmlType="submit" block >Cancelar
          </Button>
  
          <Button onClick = {Emoto(idmoto)} className="B21"
            type="primary" htmlType="submit" block
  
          >
            Aceptar
          </Button>
        </div>
    
    
    </div> )};

  const Emoto = async(idmoto) =>{

    try{
    const apiUrl = `http://localhost:3000/api/moto?${idmoto} `
    ;
    const response = await axios.delete(apiUrl);
    alert('Elemento eliminado con éxito:', response.data);
  }catch(error){alert('Error al eliminar el elemento:', error);}
  };
  

    return (

      <div className="Loguin">
      <Modal isOpen ={abrirModal} closeModal = {()=>setabrirModal(false)}  />
    </div>
    );
  };
  
  export default  EliminarMoto;