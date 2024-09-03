import{ Button }from "antd";
import "../App.css";

const EliminarUsuario = () => {
    return (
  
    <div className="Eliminar">
    
        <div className="Mensaje" >
          ¿Seguro que desea eliminar este usuario?
        </div>
  
        <div  className="Botones"  >
          <Button className="B1" type="primary" htmlType="submit" block >Cancelar
          </Button>
  
          <Button className="B2"
            type="primary" htmlType="submit" block
  
          >
            Aceptar
          </Button>
        </div>
    
    
    </div>  
    
    );
  };
  
  export default  EliminarUsuario;