import{ Button}from "antd";
import {FileDoneOutlined } from '@ant-design/icons';
import { useState} from "react";
import { useTranslation } from "react-i18next";
import axios from 'axios';


const NuevoContrato = ({isVisible, setVisible}) => {
  
  
  const [Matricula, setMatricula] = useState("");
  const [Id, setId] = useState("");
  const [dateEnd, setDateEnd] = useState(new Date());
  const [dateBegin, setDateBegin] = useState(new Date());
  const [dateFirma, setDateFirma] = useState(new Date());
  const [isChecked, setIsChecked] = useState(false);
  const [formaPago, setFormaPago] = useState("");
  const [t] = useTranslation("global");

  if (!isVisible) return null;


  const handlePetition = async (contract) => {
    console.log(contract);
  }
  return (

    <div className="pantallacontrato">

      <div style={{ 
          position: 'fixed', 
          top: '20px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
        }} >
        <FileDoneOutlined  className= "Creamoto"/>
      </div>

        <div>
          <form id="nuevo-contrato-form">
            <div id="left-div">
            <label>{t("mainContent.table.serialNumber")}</label>
            <input onChange={(e) => setMatricula(e.target.value)} placeholder="Matricula de la Moto"/>

            <label>{t("mainContent.table.clientID")}</label>
            <input onChange={(e) => setId(e.target.value)} placeholder="CI del Cliente"/>

            <label>{t("mainContent.table.signatureDate")}</label>
            <input onChange={(e) => setDateFirma(e.target.value)} type="date" placeholder="    "/>

            <label>{t("mainContent.table.startContract")}</label>
            <input onChange={(e) => setDateBegin(e.target.value)} type="date"/>
            </div>
            
            <div id="rigth-div">
            <label>{t("mainContent.table.endContract")}</label>
            <input onChange={(e) => setDateEnd(e.target.value)} type="date"/>

            <label>{t("mainContent.table.methodPayment")}</label>
            <select onChange={(e) => setFormaPago(e.target.value)} id="forma-pago">

            </select>

            <div className="checkbox">
              <label htmlFor="seguro">{t("mainContent.table.additionalInsurance")}</label>
              <input onChange={(e) => setIsChecked(e.target.value)} type="checkbox" name="seguro" id="seguro"></input>
            </div>
            </div>
          </form>
        </div>
      <div className="panelBotonescontrato">
        <Button onClick={setVisible} className="Bc1" type="primary" size="large" block >{t("login.cancel")}
        </Button>

        <Button onClick={() => handlePetition({idCliente:Id, matricula: Matricula, beginDate : dateBegin, endDate : dateEnd, firmaDate : dateFirma, formaPago : formaPago, seguro : isChecked, diasProrroga: 0})} className="Bc2" type="primary"  size="large" block>
        {t("login.accept")}
        </Button>
      </div>
    </div>



  );};


  export default  NuevoContrato ;