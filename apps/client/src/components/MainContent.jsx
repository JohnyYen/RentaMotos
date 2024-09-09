import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import ListadoClientes from "../pages/clientes/ListadoClientes";

const dateToday = () => {
  const newDate = new Date();
  const day = newDate.getDay();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  const currentDate = `${day}/${month}/${year}`;
  return currentDate;
};

const MainContent = () => {
  return (
    <div className="page-content">
      <AppRoutes dateToday={dateToday} />
    </div>
  );
};

export default MainContent;
