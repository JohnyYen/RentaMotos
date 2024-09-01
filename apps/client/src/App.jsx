import "./App.css";
import { ModificarCliente } from "./components/ModificarCliente";
import ModificarContrato from "./components/ModificarContrato";
import ModificarMoto from "./components/ModificarMoto";
import UserAdmin from "./pages/UserPages/UserAdmin";
{/* <Route path="/" element={<Loguin/>}/>
      <Route path="/admin" element={<UserAdmin/>}>
        <Route path="listadoClientes" element={<ListadoClientes/>}/>
      </Route>
      <Route path="/client" element={<UserClient/>}/> */}

function App() {

  return (
    <>
      <UserAdmin/>
    </>
  );
}

export default App;
