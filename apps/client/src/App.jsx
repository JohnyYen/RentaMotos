import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import UserAdmin from "./pages/UserPages/UserAdmin";
import Loguin from "./component/Loguin";
import UserClient from "./pages/UserPages/UserClient";
import UserWorker from "./pages/UserPages/UserWorker";
import Prueba from "./pages/UserPages/Prueba";
import GlobalProvider from "./context/GlobalContext";
import { Suspense } from "react";
import { message, notification } from "antd";
import axios from "axios";



message.config({
  duration: 20, // Duración en segundos
  maxCount: 1, // Máximo de mensajes mostrados
});

notification.config({
  pauseOnHover:true,
  showProgress:true,
})

window.addEventListener('error', async (e) => {
  if(e.error instanceof Error){
    const resp = await axios.get('http://localhost:3000/api/server');
    message.loading(resp.statusText);
  }
})
function App() {
 
  return (
    <>
        <GlobalProvider>
          <Routes>
            <Route path="/prueba" element={<Prueba/>}/>
            <Route loa path="/" element={<Loguin/>} />
            <Route path="/admin/*" element={<UserAdmin/>}/>
            <Route path="/client/*" element={<UserClient/>}/>
            <Route path="/worker/*" element={<UserWorker/>}/>
          </Routes>
        </GlobalProvider>
    </>
  );
}

export default App;
