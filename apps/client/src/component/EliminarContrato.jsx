import{ Button }from "antd";
import "../App.css";

const EliminarContrato = () => {
    return (
  
    <div className="Eliminar2">
    
       <h3 className="Mensaje2">Seguro que deseas eliminar este contrato?</h3>
  
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
  
  export default  EliminarContrato;