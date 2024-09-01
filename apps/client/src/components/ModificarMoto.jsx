import { useState } from "react";


const ModificarMoto = ({visible, setVisible, moto}) => {

    const [color, setColor] = useState("");
    const [cantKm, setCantKm] = useState(0);
    const [Situacion, setSituacion] = useState("");

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
                <select onChange={(e) => setColor(e.target.value)}>

                </select>

                <label>Cantidad de Km</label>
                <input onChange={(e) => setCantKm(e.target.value)} type="number"/>

                <label>Situacion</label>
                <input onChange={(e) => setSituacion(e.target.value)} type="text"/>
                </div>
            </form>

            <div>
                <button onClick={setVisible} className="button">Cancelar</button>
                <button onClick={handlePetition} className="button">Aceptar</button>
            </div>
        </div>
    </div>
  )
}

export default ModificarMoto