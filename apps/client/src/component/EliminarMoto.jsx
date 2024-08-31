import{ Button }from "antd";
import "../App.css";

const EliminarMoto = () => {
    return (
  
    <div className="Eliminar1">
    
        <div className="Mensaje1" >
          ¿Seguro que desea eliminar esta moto?
        </div>
  
        <div  className="Botones1"  >
          <Button className="B11" type="primary" htmlType="submit" block >Cancelar
          </Button>
  
          <Button className="B21"
            type="primary" htmlType="submit" block
  
          >
            Aceptar
          </Button>
        </div>
    
    
    </div>  
    
    );
  };
  
  export default  EliminarMoto;