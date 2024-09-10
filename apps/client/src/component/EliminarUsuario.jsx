import{ Button, Modal,useEffect, useState }from "antd";
import "../App.css";
import axios from 'axios';





const EliminarUsuario = (nombreU) => {
 
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
  


const Eusuario = async(nombreU) =>{

  try{
  const apiUrl = `http://localhost:3000/api/user?${nombreU} `
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
         footer ={[ <div  className="Botones"  >
          <Button  onClick={cerrarModal} className="B1" type="primary" htmlType="submit" block >Cancelar
          </Button>
      
          <Button onClick={accion} className="B2"
            type="primary" htmlType="submit" block
      
          >
            Aceptar
          </Button>
        </div>
      ]}>
        <div className="Eliminar">
        
            <div className="Mensaje" >
              ¿Seguro que desea eliminar este usuario?
            </div>
      
           
        
        </div>
         </Modal> 
        </div>
        
    );
  };
  
  export default  EliminarUsuario;






















  