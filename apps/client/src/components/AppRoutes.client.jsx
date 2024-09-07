import { Route, Routes } from "react-router-dom";
import ListMoto from "../pages/motos/ListMoto";
import ListadoContratos from "../pages/contratos/ListadoContratos";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="motosCliente" element={<ListadoContratos/>} />
      <Route path="contratosCliente" element={<ListMoto/>} />
    </Routes>
  );
};

export default AppRouter;
