import { Route, Routes } from "react-router-dom";
import ListMoto from "../components/ListMotoClient";
import ListadoContratos from "../components/ListadoContratosClient";
import FaqBody from "../components/Faq";
import Welcome from "../components/Welcome";
import Profile from "../components/Profile";

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