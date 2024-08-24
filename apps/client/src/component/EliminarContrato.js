import{ Button }from "antd";
import "../App.css";

const EliminarElemento = () => {
    return (
  
    <div className="Eliminar2">
    
        <div className="Mensaje2" >
          ¿Seguro que desea eliminar este contrato?
        </div>
  
        <div  className="Botones2"  >
          <Button className="B12" type="primary" htmlType="submit" block >Cancelar
          </Button>
  
          <Button className="B22"
            type="primary" htmlType="submit" block
  
          >
            Aceptar
          </Button>
        </div>
    
    
    </div>  
    
    );
  };
  
  export default  EliminarElemento;