import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import UserAdmin from "./pages/admin/UserAdmin";
import UserWorker from './pages/worker/UserWorker'
import UserClient from "./pages/UserClient";
import GlobalProvider from "./context/GlobalContext";
import CreateClient from './pages/login/components/CreateClient';
import { message, notification } from "antd";
import Register from "./pages/login/Register";
import ProtectedRoutes from './utils/ProtectedRoutes'
import Prueba from "./pages/Prueba";
import { Role } from "./utils/Role.enum";
import UnauthorizedPage from "./components/UnauthorizedPage ";
import PageNotFound from "./components/PageNotFound";


message.config({
  duration: 3, // Duración en segundos
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
            <Route path="/worker/*" element={<ProtectedRoutes permissions={[Role.Worker]}><UserWorker/></ProtectedRoutes>}/>
            <Route path="/admin/*" element={<ProtectedRoutes permissions={[Role.Admin]}><UserAdmin/></ProtectedRoutes>}/>
            <Route path="/loguin/*" element={<Register/>}/>
            <Route path="/client/*" element={<UserClient/>}/>
            <Route path="/unauthorized" element={<UnauthorizedPage/>}/>
            <Route path="/prueba/*" element={<Prueba/>}/>
            <Route path="/createClient" element={<CreateClient/>}/>
            <Route path="/*" element={<PageNotFound/>}/>
          </Routes>
        </GlobalProvider>
    </>
  );
}

export default App;
