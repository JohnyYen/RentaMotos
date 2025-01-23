import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import UserAdmin from "./pages/admin/UserAdmin";
import UserClient from "./pages/UserClient";
import UserWorker from "./pages/worker/UserWorker";
import GlobalProvider from "./context/GlobalContext";
import { message, notification } from "antd";
import Register from "./pages/login/Register";
import Prueba from "./pages/Prueba";
//import './register.css';


message.config({
  duration: 20, // Duración en segundos
  maxCount: 1, // Máximo de mensajes mostrados
});

notification.config({
  pauseOnHover:true,
  showProgress:true,
})

function App() {
  return (
    <>
        <GlobalProvider>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/home/*" element={<HomePage/>}/>
            <Route path="/worker/*" element={<UserWorker/>}/>
            <Route path="/admin/*" element={<UserAdmin/>}/>
            <Route path="/loguin/*" element={<Register/>}/>
            <Route path="/client/*" element={<UserClient/>}/>
            <Route path="/prueba/*" element={<Prueba/>}/>
          </Routes>
        </GlobalProvider>
    </>
  );
}

export default App;
