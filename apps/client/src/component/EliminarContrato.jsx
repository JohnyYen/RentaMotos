import{ Button,  useState,Modal}from "antd";
import "../App.css";
import axios from 'axios';

<<<<<<< HEAD
const EliminarContrato = () => {
    return (
=======



const EliminarContrato = (idcliente,matricula) => {


  const [visible, setVisible] = useState(false);

const Activar = () =>{
  setVisible(true)
>>>>>>> main
  
}
const Desactivar =() =>{
  setVisible(false)

}

  const Econtrato = async(idcliente,matricula) =>{

    try{
    const apiUrl = `http://localhost:3000/api/contract/${idcliente+"/"+matricula}`;
    const response = await axios.delete(apiUrl);
    alert('Elemento eliminado con éxito:', response.data);
  }catch(error){alert('Error al eliminar el elemento:', error);}
  return(Desactivar)};


    return (
      <div>
      Activar();
  <Modal visible={visible}>
  

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
    </div>
    
    );
  };
  
  export default  EliminarContrato;