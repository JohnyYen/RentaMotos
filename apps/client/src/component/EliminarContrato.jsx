import{ Button, SetState }from "antd";
import "../App.css";
import axios from 'axios';



const Econtrato=()=>{

}


const EliminarContrato = () => {
    return (
  
    <div className="Eliminar2">
    
        <div className="Mensaje2" >
          ¿Seguro que desea eliminar este contrato?
        </div>
  
        <div  className="Botones2"  >
          <Button className="B12" type="primary" htmlType="submit" block >Cancelar
          </Button>
  
    
          <Button onClick = {Econtrato} className="B22"
            type="primary" htmlType="submit" block 
  
           >
            Aceptar
          </Button>
        </div>
    
    
    </div>  
    
    );
  };
  
  export default  EliminarContrato;