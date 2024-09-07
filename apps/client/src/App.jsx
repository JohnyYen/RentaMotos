import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import UserAdmin from "./pages/UserPages/UserAdmin";
import Loguin from "./component/Loguin";




{/* <Route path="/" element={<Loguin/>}/>
      <Route path="/admin" element={<UserAdmin/>}>
        <Route path="listadoClientes" element={<ListadoClientes/>}/>
      </Route>
      <Route path="/client" element={<UserClient/>}/> */}

function App() {
 
  return (
    <>
       <Routes>
          <Route path="/" element={<Loguin/>}/>
          <Route path="/admin/*" element={<UserAdmin/>}/>
          <Route path="/client" element={<UserClient/>}/>
        </Routes>
    </>
  );
}

export default App;
