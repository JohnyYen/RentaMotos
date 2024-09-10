import { useState } from "react";
import { useTranslation } from "react-i18next";

const ModificarContrato = ({visible, setVisible, contract}) => {

    const [ci, setCi] = useState("");
    const [Matricula, setMatricula] = useState("");
    const [formaPago, setFormaPago] = useState("");
    const [Seguro, setSeguro] = useState(false);
    const [diasProrroga, setDiasProrroga] = useState(0);
    const [date, setDate] = useState(new Date());
    const [t] = useTranslation("global");

    if(!visible) return null;

    const handlePetition = () =>{
        contract.formaPago = formaPago;
        contract.seguro = Seguro;
        contract.diasProrroga = diasProrroga;

        console.log("Hello World");
        
    }

  return (
    <div className="model">
        <div id="contrato-container">
            <form>
                <div id="left-div">
                <label>{t("mainContent.table.clientID")}</label>
                <input onChange={(e) => setCi(e.target.value)} type="text"/>

                <label>{t("mainContent.table.serialNumber")}</label>
                <input onChange={(e) => setMatricula(e.target.value)} type="text"/>

                <label>{t("mainContent.table.methodPayment")}</label>
                <select onChange={(e) => setFormaPago(e.target.value)}>

                </select>
                </div>
                
                <div id="rigth-div">
                    <div  id="checkbox">
                        <label>{t("mainContent.table.additionalInsurance")}</label>
                        <input onChange={(e) => setSeguro(e.target.value)} type="checkbox"/>
                    </div>
                <label>{t("mainContent.table.extensionDays")}</label>
                <input onChange={(e) => setDiasProrroga(e.target.value)} type="number"/>

                <label>{t("mainContent.table.motorcycleDelivery")}</label>
                <input onChange={(e) => setDate(e.target.value)} type="date"/>
                </div>
            </form>

            <div id="btn-container">
                <button onClick={setVisible} className="button">{t("login.cancel")}</button>
                <button onClick={handlePetition} className="button">{t("login.accept")}</button>
            </div>
        </div>
    </div>
  )
}

export default ModificarContrato