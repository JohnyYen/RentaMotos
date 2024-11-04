import { Route, Routes } from "react-router-dom";
import ListMoto from "../pages/motos/ListMotoClient";
import ListadoContratos from "../pages/contratos/ListadoContratosClient";
import FaqBody from "./Faq";
import Welcome from "./Welcome";

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
      <Route path="/faq" element={<FaqBody/>} />
    </Routes>
  );
};

export default AppRouter;