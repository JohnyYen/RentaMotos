import { Route, Routes } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext"; 
import { useContext } from "react";
import ListMoto from "../pages/motos/ListMoto";
import ListadoClientes from "../pages/clientes/ListadoClientes";
import ListadoContratos from "../pages/contratos/ListadoContratos";
import IngresosAnno from "../pages/Ingresos anuales/IngresosAnno";

const extractDataClient = async () => {
  let dataSource = [];
  let response = null;
  try {
    response = await axios.get("http://localhost:3000/api/client/mun/:mun");

    if (response.status === 200) {
      dataSource = response.data.map((element, index) => ({
        key: index,
        municipio: element.municipio,
        nombre: element.nombre,
        ci: element.idcliente,
        "veces alquiladas": element.count,
        "valor alquileres": element.sum,
      }));
    }
  } catch (error) {
    console.log(error);
  }
  return dataSource;
};

const extractDataContract = async () => {
  const [user] = useContext(GlobalContext);
  let dataSource = [];
  let response = null;
  try {
    response = await axios.get(`http://localhost:3000/api/contract/worker/${user.municipio}`);

    if (response.status === 200) {
      dataSource = response.data.map((element, index) => ({
        key: index,
        nombre: element.nombre,
        matricula: element.matricula,
        marca: element.marca,
        modelo: element.modelo,
        "forma de pago": element.formapago,
        "fecha de inicio": element.fechainicio,
        "fecha de fin": element.fechafin,
        prorroga: element.diasprorroga,
        "seguro adicional": element.seguro  ? "✔" : "❌",
        "importe total": element.importe,
      }));
    }
  } catch (error) {
    console.log(error);
  }
  return dataSource;
};

const extractDataIncome = async () => {
  const [user] = useContext(GlobalContext);
  let dataSource = [];
  try {
   const response = axios.get(`http://localhost:3000/api/pagos/${user.municipio}`);
   if(response.status === 200){
    console.log(response.data);
    
    // dataSource = response.data.map((element, index) => ({
    //   key: index,
    //   "ingreso anual": element. ,
    //   "ingreso enero": element. ,
    //   "ingreso febrero": element. ,
    //   "ingreso marzo": element. ,
    //   "ingreso abril": element. ,
    //   "ingreso mayo": element. ,
    //   "ingreso junio": element. ,
    //   "ingreso julio": element. ,
    //   "ingreso septiembre": element. ,
    //   "ingreso octubre": element. ,
    //   "ingreso noviembre": element. ,
    //   "ingreso diciembre": element. 
    // }))
   }  
  } catch (error) {
    
  }
};

const AppRouter = () => {

  return (
    <Routes>
      <Route path="listadoClientes" element={<ListadoClientes extractData={extractDataClient} />}/>
      <Route path="listadoMoto" element={<ListMoto />}></Route>
      <Route path="listadoContratos" element={<ListadoContratos extractData={extractDataContract} />}></Route>
      <Route path="ingresosAño" element={<IngresosAnno extractData={extractDataIncome} />} />
    </Routes>
  );
};

export default AppRouter;
