import{ Button, Modal,useEffect, useState }from "antd";
import "../App.css";
import axios from 'axios';





const EliminarUsuario = (nombreU) => {

  const [visible, setVisible] = useState(false);

const Activar =() =>{
  setVisible(true)
  
}
const Desactivar =() =>{
  setVisible(false)
  
}

const Eusuario = async(nombreU) =>{

  try{
  const apiUrl = `http://localhost:3000/api/user/${nombreU} `
  ;
  const response = await axios.delete(apiUrl);
  alert('Elemento eliminado con éxito:', response.data);
}catch(error){alert('Error al eliminar el elemento:', error);}
return(Desactivar)};


    return (
      <div>
   <Modal visible={visible}>
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
    
  
    </div>  
      </Modal>
      </div>
    );
  };
  
  export default  EliminarUsuario;