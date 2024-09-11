import { Route, Routes } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext"; 
import React, { useContext, useEffect, useState } from "react";
import ListMoto from "../pages/motos/ListMoto";
import ListadoClientes from "../pages/clientes/ListadoClientes";
import ListadoContratos from "../pages/contratos/ListadoContratos";
import IngresosAnno from "../pages/Ingresos anuales/IngresosAnno";
import { Result } from "antd";
import axios from "axios";

const extractDataClient = async (user) => {
  let dataSource = [];
  let response = null;
  try {
    response = await axios.get(`http://localhost:3000/api/client/mun/${user.mun}`);
    console.log(response);
    if (response.status === 200) {
      dataSource = response.data.map((element, index) => ({
        key: index,
        municipio: element.municipio,
        nombre: element.nombre,
        ci: element.idcliente,
        "veces alquiladas": element.count,
        "valor alquileres": element.sum,
      }));
    }
  } catch (error) {
    console.log(error);
  }
  return dataSource;
};

const extractDataContract = async (user) => {
  let dataSource = [];
  let response = null;
  try {
    response = await axios.get(`http://localhost:3000/api/contract/worker/${user.mun}`);

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
        "seguro adicional": element.seguro  ? "✔" : "❌",
        "importe total": element.importe,
      }));
    }
  } catch (error) {
    console.log(error);
  }
  return dataSource;
};

const extractDataIncome = async (user) => {
  let dataSource = [];
  try {
   const response = axios.get(`http://localhost:3000/api/pagos/${user.mun}`);
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
};

const AppRouter = () => {
  const { user } = useContext(GlobalContext);
  const [dataClient, setDataClient] = useState();
  const [dataContract, setDataContract] = useState();
  const [dataIncome, setDataIncome] = useState();
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
  }, [])


  return (
    <Routes>
      <Route path="listadoClientes" element={<ListadoClientes extractData={dataClient} />}/>
      <Route path="listadoMoto" element={<ListMoto />}></Route>
      <Route path="listadoContratos" element={<ListadoContratos extractData={dataContract} />}></Route>
      <Route path="ingresosAño" element={<IngresosAnno extractData={dataIncome} />} />
    </Routes>
  );
};

export default AppRouter;
