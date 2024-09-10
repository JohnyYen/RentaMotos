import { useState } from "react";
import { useTranslation } from "react-i18next";

const ModificarMoto = ({visible, setVisible, moto}) => {

    const [color, setColor] = useState("");
    const [cantKm, setCantKm] = useState(0);
    const [Situacion, setSituacion] = useState("");
    const [t] = useTranslation("global");

    if(!visible) return null;

    const handlePetition = () => {
        console.log("hello World");
    }
  return (
    <div className="model">
        <div className="modify-container">
            <form>
                <div id="left-div">
                <label>Color</label>
                <select onChange={(e) => setColor(e.target.value)} value={moto.color}>

                </select>

                <label>{t("mainContent.table.kmTraveled")}</label>
                <input onChange={(e) => setCantKm(e.target.value)} type="number"/>

                <label>{t("mainContent.table.situation")}</label>
                <input onChange={(e) => setSituacion(e.target.value)} type="text"/>
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

export default ModificarMoto