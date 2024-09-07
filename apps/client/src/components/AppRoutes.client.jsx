import { Route, Routes } from "react-router-dom";
import ListMoto from "../pages/motos/ListMotoClient";
import ListadoContratos from "../pages/contratos/ListadoContratosClient";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="motosCliente" element={<ListMoto/>} />
      <Route path="contratosCliente" element={<ListadoContratos/>} />
    </Routes>
  );
};

export default AppRouter;
