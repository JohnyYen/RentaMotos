import{ Button,  useState,Modal}from "antd";
import "../App.css";
import axios from 'axios';




const EliminarContrato = (idcliente,matricula) => {


  const [abrirModal, setabrirModal]= useState (false);
  
  const Modal =(isOpen, closeModal) =>{
    if(!isOpen) return null;
    
      return(
        <div className="Eliminar2">
    
            <div className="Mensaje2" >
              ¿Seguro que desea eliminar este contrato?
            </div>
      
            <div  className="Botones2"  >
              <Button onClick ={Desactivar} className="B12" type="primary" htmlType="submit" block >Cancelar
              </Button>
      
        
              <Button onClick = {Econtrato(idcliente,matricula) } className="B22"
                type="primary" htmlType="submit" block 
      
               >
                Aceptar
              </Button>
            </div>
        
        
        </div>  )};





  const Econtrato = async(idcliente,matricula) =>{

    try{
    const apiUrl = `http://localhost:3000/api/contract?idcliente=${idcliente}&matricula=${matricula} `
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
  
  export default  EliminarContrato;