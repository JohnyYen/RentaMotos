import { Route, Routes } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import ListMoto from "../../../components/ListMoto";
import ListadoClientes from "./ListadoClientes";
import Incumplidores from "./Incumplidores";
import SituacionMoto from "./SituacionMoto";
import ListadoContratos from "./ListadoContratos";
import ContratosMarcaModelo from "./ContratosMarcaModelo";
import ContratosMunicipio from "./ContratosMunicipio";
import IngresosAnno from "../../../components/IngresosAnno";
import axios from "axios";
import ListadoTrabajadores from "./ListadoTrabajadores";

const dateToday = () => {
  const newDate = new Date();
  const day = newDate.getDay();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  const currentDate = `${day}/${month}/${year}`;
  return currentDate;
};

const extractDataClient = async () => {
  let dataSource = [];
  let response = null;
  const jwt = JSON.parse(sessionStorage.getItem('jwt'));
  try {
    response = await axios.get("http://localhost:3000/api/client", {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
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

const extractDataContract = async () => {
  let dataSource = [];
  let response = null;

  const jwt = JSON.parse(sessionStorage.getItem('jwt'));
  try {
    response = await axios.get("http://localhost:3000/api/contract", {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });

    if (response.status === 200) {
      dataSource = response.data.map((element, index) => ({
        key: index,
        nombre: element.nombre,
        matricula: element.matricula,
        marca: element.marca,
        modelo: element.modelo,
        "forma de pago": element.formapago,
        "fecha de inicio": element.fechainicio,
        fechaFin: element.fechafin,
        prorroga: element.diasprorroga,
        "seguro adicional": element.seguro ? "Si" : "No",
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
  const jwt = JSON.parse(sessionStorage.getItem('jwt'));
  try {
   const response = await axios.get("http://localhost:3000/api/contract/cobros", {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
   });
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

const AppRouter = () => {
  const { user } = useContext(GlobalContext);
  const [dataClient, setDataClient] = useState();
  const [dataContract, setDataContract] = useState();
  const [dataIncome, setDataIncome] = useState();

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
      <Route path="" element={<ListadoClientes dataClient={dataClient} setDataClient={setDataClient} url={'http://localhost:3000/api/client/pdf'} />}/>
      <Route path="incumplidoresClientes" element={<Incumplidores />}></Route>
      <Route path="listadoMoto" element={<ListMoto />}></Route>
      <Route path="situacionMotos" element={<SituacionMoto />}></Route>
      <Route path="contratoMarcaModelo" element={<ContratosMarcaModelo />}></Route>
      <Route path="listadoContratos" element={<ListadoContratos dataContract={dataContract} setDataContract={setDataContract} url={'http://localhost:3000/api/contract/pdf'} />}></Route>
      <Route path="contratoMunicipio" element={<ContratosMunicipio />}></Route>
      <Route path="ingresosAño" element={<IngresosAnno extractData={dataIncome} url={'http://localhost:3000/api/contract/pagos/pdf'} />}></Route>
      <Route path="crearContrato" element></Route>
      <Route path="contratosCliente" element={<ListadoContratos />}></Route>
      <Route path="motosCliente" element={<ListMoto />}></Route>
      <Route path="listadoTrabajadores" element={<ListadoTrabajadores />} ></Route>
    </Routes>
  );
};

export default AppRouter;
