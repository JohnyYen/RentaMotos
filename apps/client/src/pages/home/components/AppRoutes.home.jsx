import { Route, Routes } from "react-router-dom";
import ListMoto from "../pages/motos/ListMotoClient";
import ListadoContratos from "../pages/contratos/ListadoContratosClient";
import FaqBody from "./Faq";
import Welcome from "./Welcome";
import Profile from "./Profile";

const dateToday = () => {
  const newDate = new Date();
  const day = newDate.getDay();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  const currentDate = `${day}/${month}/${year}`;
  return currentDate;
};

const AppRouter = () => {
  return (
    <Routes>
     <Route path="" element={<Welcome/>} />
      <Route path="faq" element={<FaqBody/>} />
      <Route path="motosCliente" element={<ListMoto/>} />
      <Route path="contratosCliente" element={<ListadoContratos/>} />
      <Route path="perfil" element={<Profile/>} />
    </Routes>
  );
};

export default AppRouter;