import { Route, Routes } from "react-router-dom";
import ListMoto from "../pages/motos/ListMoto";
import ListadoClientes from "../pages/clientes/ListadoClientes";
import SituacionMoto from "../pages/motos/SituacionMoto";
import Incumplidores from "../pages/clientes/Incumplidores";
import ListadoContratos from "../pages/contratos/ListadoContratos";
import ContratosMarcaModelo from "../pages/contratos/ContratosMarcaModelo";
import ContratosMunicipio from "../pages/contratos/ContratosMunicipio";
import IngresosAnno from "../pages/Ingresos anuales/IngresosAnno";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/listadoClientes" element={<ListadoClientes />}></Route>
      <Route path="/incumplidoresClientes" element={<Incumplidores />}></Route>
      <Route path="/listadoMoto" element={<ListMoto />}></Route>
      <Route path="/situacionMotos" element={<SituacionMoto />}></Route>
      <Route path="/contratoMarcaModelo" element={<ContratosMarcaModelo />}></Route>
      <Route path="/listadoContratos" element={<ListadoContratos />}></Route>
      <Route path="contratoMunicipio" element={<ContratosMunicipio />}></Route>
      <Route path="/ingresosAño" element={<IngresosAnno />}></Route>
    </Routes>
  );
};

export default AppRouter;
