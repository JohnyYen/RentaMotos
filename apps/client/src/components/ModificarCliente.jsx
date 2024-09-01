import { useState } from "react";

export const ModificarCliente = ({visible, setVisible, client}) => {

    const [dad, setEdad] = useState(0);
    const [Municipio, setMunicipio] = useState("");
    const [name, setName] = useState("");
    const [secondName, setSecondName] = uSeState("");
    const [lastName, setLastName] = useState("");
    const [secondLast, setSecondLast] = useState("");
    const [numCont, setNumCont] = useState("");

    if(!visible) return null;

    const handlePetition = () => {
        console.log("hello World")
    }
  return (
    <div className='model'>
        <div className='modify-container-cliente'>
            <form>
                <div id="left-div">
                    <label>Edad</label>
                    <input onChange={(e) => setEdad(e.target.value)} type="number" placeholder="Edad"/>

                    <label>Municipio</label>
                    <input onChange={(e) => setMunicipio(e.target.value)} type="text"/>

                    <label>Nombre</label>
                    <input onChange={(e) => setName(e.target.value)} type="text"/>

                    <label>Segundo Nombre</label>
                    <input onChange={(e) => setSecondName(e.target.value)} type="text"/>
                </div>

               <div id="rigth-div">
                    <label>Primer Apellido</label>
                    <input onChange={(e) => setLastName(e.target.value)} type="text"/>

                    <label>Segundo Apellido</label>
                    <input onChange={(e) => setSecondLast(e.target.value)} type="text"/>

                    <label>Numero Contacto</label>
                    <input onChange={(e) => setNumCont(e.target.value)} type="text"/>
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
