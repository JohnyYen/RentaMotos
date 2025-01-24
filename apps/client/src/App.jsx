import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import UserAdmin from "./pages/admin/UserAdmin";
import UserWorker from './pages/worker/UserWorker'
import UserClient from "./pages/UserClient";
import GlobalProvider from "./context/GlobalContext";
import { message, notification } from "antd";
import Register from "./pages/login/Register";
import CreateClient from "./pages/login/components/CreateClient";
import ProtectedRoutes from './utils/ProtectedRoutes'
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
            <Route path="/worker/*" element={<ProtectedRoutes><UserWorker/></ProtectedRoutes>}/>
            <Route path="/admin/*" element={<UserAdmin/>}/>
            <Route path="/loguin/*" element={<Register/>}/>
            <Route path="/client/*" element={<UserClient/>}/>
            <Route path="/loginClient/*" element={<CreateClient/>}/>
          </Routes>
        </GlobalProvider>
    </>
  );
}

export default App;
