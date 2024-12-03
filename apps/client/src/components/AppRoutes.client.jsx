import { Route, Routes } from "react-router-dom";
import ListMoto from "../pages/home/components/ListMotoClient";
import ListadoContratos from "../pages/home/components/ListadoContratosClient";

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
      <Route path="motosCliente" element={<ListMoto/>} />
      <Route path="contratosCliente" element={<ListadoContratos/>} />
    </Routes>
  );
};

export default AppRouter;
