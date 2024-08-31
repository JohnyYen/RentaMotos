import{ Button,useEffect, useState,Modal }from "antd";
import "../App.css";
import axios from 'axios';

const EliminarMoto = (idmoto) => {
  
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
  

  const Emoto = async(idmoto) =>{

    try{
    const apiUrl = `http://localhost:3000/api/moto?${idmoto} `
    ;
    const response = await axios.delete(apiUrl);
    alert('Elemento eliminado con éxito:', response.data);
  }catch(error){alert('Error al eliminar el elemento:', error);}
  };
  

    return (

      <div className="EliminarElemento">

 
      <Modal 
         
         visible = {modal}
         onCancel = {cerrarModal}
         onOk = {accion}
         footer ={[ <div  className="Botones1"  >
          <Button  onClick={cerrarModal} className="B11" type="primary" htmlType="submit" block >Cancelar
          </Button>
      
          <Button onClick={accion} className="B21"
            type="primary" htmlType="submit" block
      
          >
            Aceptar
          </Button>
        </div>
      ]}>
        <div className="Eliminar1">
        
            <div className="Mensaje1" >
              ¿Seguro que desea eliminar esta moto?
            </div>
      
           
        
        </div>
         </Modal> 
        </div>
        
      
    );
  };
  
  export default  EliminarMoto;