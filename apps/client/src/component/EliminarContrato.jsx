import{ Button,  useState,Modal}from "antd";
import "../App.css";
import axios from 'axios';

<<<<<<< HEAD
const EliminarContrato = () => {
    return (
=======



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




<<<<<<< HEAD
const Activar = () =>{
  setVisible(true)
>>>>>>> main
  
}
const Desactivar =() =>{
  setVisible(false)

}
=======
>>>>>>> 624c6d72aa96f741ef2b5f24673da529581d2ed9

  const Econtrato = async(idcliente,matricula) =>{

    try{
<<<<<<< HEAD
    const apiUrl = `http://localhost:3000/api/contract/${idcliente+"/"+matricula}`;
=======
    const apiUrl = `http://localhost:3000/api/contract?idcliente=${idcliente}&matricula=${matricula} `
    ;
>>>>>>> 624c6d72aa96f741ef2b5f24673da529581d2ed9
    const response = await axios.delete(apiUrl);
    alert('Elemento eliminado con éxito:', response.data);
  }catch(error){alert('Error al eliminar el elemento:', error);}
  return(Desactivar)};


    return (
  
<<<<<<< HEAD

    <div className="Eliminar2">
<<<<<<< HEAD
    
       <h3 className="Mensaje2">Seguro que deseas eliminar este contrato?</h3>
=======

        <div className="Mensaje2" >
          ¿Seguro que desea eliminar este contrato?
        </div>
>>>>>>> main
  
        <div  className="Botones2"  >
          <Button onClick ={Desactivar} className="B12" type="primary" htmlType="submit" block >Cancelar
          </Button>
  
    
          <Button onClick = {Econtrato(idcliente,matricula) } className="B22"
            type="primary" htmlType="submit" block >
            Aceptar
          </Button>
        </div>
    
    
    </div>  
    </Modal>
=======
  
      <div className="Loguin">
      <Modal isOpen ={abrirModal} closeModal = {()=>setabrirModal(false)}  />
>>>>>>> 624c6d72aa96f741ef2b5f24673da529581d2ed9
    </div>
    
    
    );
  };
  
  export default  EliminarContrato;