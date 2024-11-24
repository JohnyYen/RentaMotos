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



message.config({
  duration: 20, // Duración en segundos
  maxCount: 1, // Máximo de mensajes mostrados
});

notification.config({
  pauseOnHover:true,
  showProgress:true,
})

window.addEventListener('beforeunload', () => localStorage.clear);

// window.addEventListener('error', async (e) => {
//   if(e.error instanceof Error){
//     const resp = await axios.get('http://localhost:3000/api/server');
//     message.loading(resp.statusText);
//   }
// })
function App() {
  const navigate = useNavigate();
 
  return (
    <>
        <GlobalProvider>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/home/*" element={<HomePage/>}/>
            <Route path="/admin/*" element={<UserAdmin/>}/>
            <Route path="/loguin/*" element={<Loguin/>}/>
            <Route path="/client/*" element={<UserClient/>}/>
          </Routes>
        </GlobalProvider>
    </>
  );
}

export default App;
