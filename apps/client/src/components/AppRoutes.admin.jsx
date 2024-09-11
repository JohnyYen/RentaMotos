import { Route, Routes } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import ListMoto from "../pages/motos/ListMoto";
import ListadoClientes from "../pages/clientes/ListadoClientes";
import Incumplidores from "../pages/clientes/Incumplidores";
import SituacionMoto from "../pages/motos/SituacionMoto";
import ListadoContratos from "../pages/contratos/ListadoContratos";
import ContratosMarcaModelo from "../pages/contratos/ContratosMarcaModelo";
import ContratosMunicipio from "../pages/contratos/ContratosMunicipio";
import IngresosAnno from "../pages/Ingresos anuales/IngresosAnno";
import UserAdmin from "../pages/UserPages/UserAdmin";
import Loguin from "../component/Loguin";
import axios from "axios";
import ListadoTrabajadores from "../pages/trabajadores/ListadoTrabajadores";

const extractDataClient = async () => {
  let dataSource = [];
  let response = null;
  try {
    response = await axios.get("http://localhost:3000/api/client");

    if (response.status === 200) {
      dataSource = response.data.map((element, index) => ({
        key: index,
        municipio: element.municipio,
        nombre: element.nombre,
        ci: element.idcliente,
        "veces alquiladas": element.cant_alquileres,
        "valor alquileres": element.valor_total,
      }));
    }
  } catch (error) {
    console.log(error);
  }
  return dataSource;
};

const extractDataContract = async () => {
  let dataSource = [];
  let response = null;
  try {
    response = await axios.get("http://localhost:3000/api/contract");

    if (response.status === 200) {
      dataSource = response.data.map((element, index) => ({
        key: index,
        nombre: element.nombre,
        matricula: element.matricula,
        marca: element.marca,
        modelo: element.modelo,
        "forma de pago": element.formapago,
        "fecha de inicio": element.fechainicio,
        "fecha de fin": element.fechafin,
        prorroga: element.diasprorroga,
        "seguro adicional": element.seguro ? "✔" : "❌",
        "importe total": element.importe,
      }));
    }
  } catch (error) {
    console.log(error);
  }
  return dataSource;
};

const extractDataIncome = async () => {
  let dataSource = [];
  try {
   const response = await axios.get("http://localhost:3000/api/pagos");

   if(response.status === 200){
    
    dataSource = response.data.map((element, index) => ({
      key: index,
      "ingreso anual": element.total_ventas,
      "ingreso enero": element.enero,
      "ingreso febrero": element.febrero,
      "ingreso marzo": element.marzo,
      "ingreso abril": element.abril,
      "ingreso mayo": element.mayo,
      "ingreso junio": element.junio,
      "ingreso julio": element.julio,
      "ingreso septiembre": element.septiembre,
      "ingreso octubre": element.octubre,
      "ingreso noviembre": element.noviembre,
      "ingreso diciembre": element.diciembre 
    }))
   }  
  } catch (error) {
    console.log(error);
  }
  return dataSource;
};

const extractDataWorker = async () => {
  let dataSource = [];
  try {
   const response = axios.get("http://localhost:3000/api/user/worker");
   console.log(response);
   if(response.status === 200){
    
    // dataSource = response.data.map((element, index) => ({
    //   key: index,
    //   "ingreso anual": element. ,
    //   "ingreso enero": element. ,
    //   "ingreso febrero": element. ,
    //   "ingreso marzo": element. ,
    //   "ingreso abril": element. ,
    //   "ingreso mayo": element. ,
    //   "ingreso junio": element. ,
    //   "ingreso julio": element. ,
    //   "ingreso septiembre": element. ,
    //   "ingreso octubre": element. ,
    //   "ingreso noviembre": element. ,
    //   "ingreso diciembre": element. 
    // }))
   }  
  } catch (error) {
    
  }

  return dataSource;
};


const AppRouter = () => {
  const { user } = useContext(GlobalContext);
  const [dataClient, setDataClient] = useState();
  const [dataContract, setDataContract] = useState();
  const [dataIncome, setDataIncome] = useState();
  const [dataWorker, setDataWorker] = useState();
  console.log(user);

  useEffect(() => {
    extractDataClient(user).then((result) => {
      setDataClient(result);
    })

    extractDataContract(user).then((result) => {
      setDataContract(result);
    })

    extractDataIncome(user).then((result) => {
      setDataIncome(result);
    })

    extractDataWorker().then((result) => {
      setDataWorker(result);
    })
  }, [])

  return (
    <Routes>
      <Route path="listadoClientes" element={<ListadoClientes extractData={dataClient} />}/>
      <Route path="incumplidoresClientes" element={<Incumplidores />}></Route>
      <Route path="listadoMoto" element={<ListMoto />}></Route>
      <Route path="situacionMotos" element={<SituacionMoto />}></Route>
      <Route path="contratoMarcaModelo" element={<ContratosMarcaModelo />}></Route>
      <Route path="listadoContratos" element={<ListadoContratos extractData={dataContract} />}></Route>
      <Route path="contratoMunicipio" element={<ContratosMunicipio />}></Route>
      <Route path="ingresosAño" element={<IngresosAnno extractData={dataIncome} />}></Route>
      <Route path="crearContrato" element></Route>
      <Route path="contratosCliente" element={<ListadoContratos />}></Route>
      <Route path="motosCliente" element={<ListMoto />}></Route>
      <Route path="listadoTrabajadores" element={<ListadoTrabajadores extractData={dataWorker} />} ></Route>
    </Routes>
  );
};

export default AppRouter;
