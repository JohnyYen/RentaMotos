import UserAdmin from "./pages/UserPages/UserAdmin";
import Loguin from './component/Loguin';
import UserClient from './pages/UserPages/UserClient'
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ListadoClientes from "./pages/clientes/ListadoClientes";
import AppRouter from "./components/AppRoutes";

{/* <Route path="/" element={<Loguin/>}/>
      <Route path="/admin" element={<UserAdmin/>}>
        <Route path="listadoClientes" element={<ListadoClientes/>}/>
      </Route>
      <Route path="/client" element={<UserClient/>}/> */}

function App() {

  return (
    <AppRouter/>
  );
}

export default App;
