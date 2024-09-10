import { Route, Routes } from "react-router-dom";
import ListMoto from "../pages/motos/ListMoto";
import ListadoClientes from "../pages/clientes/ListadoClientes";
import Incumplidores from "../pages/clientes/Incumplidores";
import SituacionMoto from "../pages/motos/SituacionMoto";
import ListadoContratos from "../pages/contratos/ListadoContratos";
import ContratosMarcaModelo from "../pages/contratos/ContratosMarcaModelo";
import ContratosMunicipio from "../pages/contratos/ContratosMunicipio";
import IngresosAnno from "../pages/Ingresos anuales/IngresosAnno";
import UserAdmin from "../pages/UserPages/UserAdmin";
import Loguin from "../component/Loguin";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="listadoClientes" element={<ListadoClientes/>}/>
      <Route path="listadoMoto" element={<ListMoto />}></Route>
      <Route path="listadoContratos" element={<ListadoContratos />}></Route>
    </Routes>
  );
};

export default AppRouter;
