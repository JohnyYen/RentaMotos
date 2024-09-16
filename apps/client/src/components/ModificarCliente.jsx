import { useState } from "react";
import { useTranslation } from "react-i18next";

const ModificarCliente = ({visible, setVisible, client}) => {

    const [edad, setEdad] = useState(0);
    const [Municipio, setMunicipio] = useState("");
    const [name, setName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [lastName, setLastName] = useState("");
    const [secondLast, setSecondLast] = useState("");
    const [numCont, setNumCont] = useState("");
    const [t] = useTranslation("global");

    if(!visible) return null;

    const handlePetition = () => {
        console.log("hello World")
    }

  return (
    <div className='model'>
        <div className='modify-container-cliente'>
            <form>
                <div id="left-div">
                    <label>{t("profile.age")}</label>
                    <input onChange={(e) => setEdad(e.target.value)} type="number" placeholder={t("profile.age")}/>

                    <label>{t("profile.municipality")}</label>
                    <input onChange={(e) => setMunicipio(e.target.value)} type="text" placeholder={t("profile.municipality")}/>

                    <label>{t("profile.name")}</label>
                    <input onChange={(e) => setName(e.target.value)} type="text" placeholder={t("profile.name")}/>

                    <label>{t("profile.middleName")}</label>
                    <input onChange={(e) => setSecondName(e.target.value)} type="text" placeholder={t("profile.middleName")}/>
                </div>

               <div id="rigth-div">
                    <label>{t("profile.lastName")}</label>
                    <input onChange={(e) => setLastName(e.target.value)} type="text" placeholder={t("profile.lastName")}/>

                    <label>{t("profile.secondLastName")}</label>
                    <input onChange={(e) => setSecondLast(e.target.value)} type="text" placeholder={t("profile.secondLastName")}/>

                    <label>{t("profile.contactNumber")}</label>
                    <input onChange={(e) => setNumCont(e.target.value)} type="text" placeholder={t("profile.contactNumber")}/>
               </div>
            </form>

            <div>
                <button onClick={setVisible} className="button">{t("login.cancel")}</button>
                <button onClick={handlePetition} className="button">{t("login.accept")}</button>
            </div>
        </div>
    </div>
  )  
}


export default ModificarCliente;
