import { Route, Routes } from "react-router-dom";
import { GlobalContext } from "../../../context/GlobalContext"; 
import React, { useContext, useEffect, useState } from "react";
import ListMoto from "../../../components/ListMoto";
import ListadoClientes from '../components/ListadoClientesWorker'
import ListadoContratos from "../components/ListadoContratoWorker";
import IngresosAnno from "../../../components/IngresosAnno";
import { Result } from "antd";
import axios from "axios";
import { use } from "i18next";


const dateToday = () => {
  const newDate = new Date();
  const day = newDate.getDay();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  const currentDate = `${day}/${month}/${year}`;
  return currentDate;
};

const extractDataClient = async (user) => {
  let dataSource = [];
  let response = null;
  console.log(user);
  try {
    response = await axios.get(`http://localhost:3000/api/client/mun/${user?.mun}`);
    console.log(user?.mun);
    console.log(response);

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

const extractDataContract = async (user) => {
  let dataSource = [];
  let response = null;
  try {
    const jwt = JSON.parse(sessionStorage.getItem("jwt"));
    response = await axios.get(`http://localhost:3000/api/contract/worker/${user?.mun}`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });

    if (response.status === 200) {
      dataSource = response.data.data.map((element, index) => ({
        key: index,
        nombre: element.nombre,
        matricula: element.matricula,
        marca: element.marca,
        modelo: element.modelo,
        "forma de pago": element.formapago,
        "fecha de inicio": element.fechainicio,
        fechaFin: element.fechafin,
        prorroga: element.diasprorroga,
        "seguro adicional": element.seguro  ? "Si" : "No",
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
   const jwt = JSON.parse(sessionStorage.getItem("jwt"));
   const response = await axios.get(`http://localhost:3000/api/contract/cobros/${user?.mun}`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
   });
   if(response.status === 200){
    dataSource = response.data.map((element, index) => ({
      key: index,
      "ingreso anual":  Number(element.enero) + Number(element.febrero) + Number(element.marzo) + Number(element.abril) + Number(element.mayo) + Number(element.junio) + Number(element.julio) + Number(element.agosto) + Number(element.septiembre) + Number(element.octubre) + Number(element.noviembre) + Number(element.diciembre),
      "ingreso enero": element.enero,
      "ingreso febrero": element.febrero,
      "ingreso marzo": element.marzo,
      "ingreso abril": element.abril,
      "ingreso mayo": element.mayo,
      "ingreso junio": element.junio,
      "ingreso julio": element.julio,
      'ingreso agosto':element.agosto,
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

// let dataClient, dataContract, dataIncome;

// const user = localStorage.getItem('userData');

// extractDataClient(user).then((result) => {
//   dataClient = result;
// })

// extractDataContract(user).then((result) => {
//   dataContract = result;
// })

// extractDataIncome(user).then((result) => {
//   dataIncome = result;
// })


const AppRouter = () => {
  const { user } = useContext(GlobalContext);
  const [dataClient, setDataClient] = useState();
  const [dataContract, setDataContract] = useState();
  const [dataIncome, setDataIncome] = useState();

  const extractDataClient = async () => {
    let dataSource = [];
    let response = null;
    console.log(user);
    try {
      const jwt = JSON.parse(sessionStorage.getItem("jwt"));
      response = await axios.get(`http://localhost:3000/api/client/mun/${user?.mun}`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      console.log(user?.mun);
      console.log(response);
  
      if (response.status === 200) {
        dataSource = response.data.data.map((element, index) => ({
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
  useEffect(() => {
    console.log(user);
    extractDataClient().then((result) => {
      setDataClient(result);
    })

    console.log(dataClient);
    extractDataContract(user).then((result) => {
      setDataContract(result);
    })

    extractDataIncome(user).then((result) => {
      setDataIncome(result);
    })
  }, [user])

  return (
    <Routes>
      <Route path="listadoClientes" element={<ListadoClientes dataClient={dataClient} setDataClient={setDataClient} url={`http://localhost:3000/api/client/worker/pdf/${user?.mun}`} />}/>
      <Route path="listadoMoto" element={<ListMoto />}></Route>
      <Route path="listadoContratos"  element={<ListadoContratos  dataContract={dataContract} setDataContract={setDataContract} url={`http://localhost:3000/api/contract/worker/pdf/${user?.mun}`} />}></Route>
      <Route path="ingresosAño" element={<IngresosAnno extractData={dataIncome} url={`http://localhost:3000/api/pagos/worker/pdf/${user?.mun}`} />} />
    </Routes>
  );
};

export default AppRouter;
