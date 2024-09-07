import { Route, Routes } from "react-router-dom";
import ListMoto from "../pages/motos/ListMoto";
import ListadoContratos from "../pages/contratos/ListadoContratos";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="motosCliente" element={<ListMoto/>} />
      <Route path="contratosCliente" element={<ListadoContratos/>} />
    </Routes>
  );
};

export default AppRouter;
