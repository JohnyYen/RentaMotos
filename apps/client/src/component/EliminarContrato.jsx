import{ Button,  useState,Modal}from "antd";
import "../App.css";
import axios from 'axios';




const EliminarContrato = (idcliente,matricula) => {

  const [modal, setModal]= useState (false);



  const abrirModal =() =>{
  setModal(true);
  }
  
  const cerrarModal =() =>{
    setModal(false);
    }
    
  
  const accion=() =>{
    cerrarModal();
  };


  const Econtrato = async(idcliente,matricula) =>{

    try{
    const apiUrl = `http://localhost:3000/api/contract?idcliente=${idcliente}&matricula=${matricula} `
    ;
    const response = await axios.delete(apiUrl);
    alert('Elemento eliminado con éxito:', response.data);
  }catch(error){alert('Error al eliminar el elemento:', error);}
  return(Desactivar)};


    return (
  
      <div className="EliminarElemento">

 
      <Modal 
         
         visible = {modal}
         onCancel = {cerrarModal}
         onOk = {accion}
         footer ={[ <div  className="Botones2"  >
          <Button  onClick={cerrarModal} className="B12" type="primary" htmlType="submit" block >Cancelar
          </Button>
      
          <Button onClick={accion} className="B22"
            type="primary" htmlType="submit" block
      
          >
            Aceptar
          </Button>
        </div>
      ]}>
        <div className="Eliminar2">
        
            <div className="Mensaje2" >
              ¿Seguro que desea eliminar esta moto?
            </div>
      
           
        
        </div>
         </Modal> 
        </div>
        
      
    );
  };
  
  export default  EliminarContrato;