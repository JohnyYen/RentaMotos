import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/UserPages/HomePage";
import UserAdmin from "./pages/UserPages/UserAdmin";
import Loguin from "./component/Loguin";
import UserClient from "./pages/UserPages/UserClient";
import UserWorker from "./pages/UserPages/UserWorker";
import Prueba from "./pages/UserPages/Prueba";
import GlobalProvider from "./context/GlobalContext";
import { Suspense } from "react";
import { message, notification } from "antd";
import axios from "axios";
import { SiHomepage } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import FaqBody from "./components/Faq";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Register from "./components/Register";
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
            <Route path="/login/*" element={<Register/>}/>
            <Route path="/admin/*" element={<ProtectedRoutes children={<UserAdmin/>}/>}/>
            <Route path="/worker/*" element={<ProtectedRoutes children={<UserWorker/>}/>}/>
          </Routes>
        </GlobalProvider>
    </>
  );
}

export default App;
