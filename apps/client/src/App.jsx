import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import UserAdmin from "./pages/UserPages/UserAdmin";
import Loguin from "./component/Loguin";
import UserClient from "./pages/UserPages/UserClient";
import UserWorker from "./pages/UserPages/UserWorker";
import Prueba from "./pages/UserPages/Prueba";
import GlobalProvider from "./context/GlobalContext";



{/* <Route path="/" element={<Loguin/>}/>
      <Route path="/admin" element={<UserAdmin/>}>
        <Route path="listadoClientes" element={<ListadoClientes/>}/>
      </Route>
      <Route path="/client" element={<UserClient/>}/> */}

function App() {
 
  return (
    <>
        <GlobalProvider>
          <Routes>
            <Route path="/prueba" element={<Prueba/>}/>
            <Route path="/" element={<Loguin/>} />
            <Route path="/admin/*" element={<UserAdmin/>}/>
            <Route path="/client/*" element={<UserClient/>}/>
            <Route path="/worker/*" element={<UserWorker/>}/>
          </Routes>
        </GlobalProvider>
    </>
  );
}

export default App;
