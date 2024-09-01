import { useState } from "react";


const ModificarContrato = ({visible, setVisible, contract}) => {

    const [ci, setCi] = useState("");
    const [Matricula, setMatricula] = useState("");
    const [formaPago, setFormaPago] = useState("");
    const [Seguro, setSeguro] = useState(false);
    const [diasProrroga, setDiasProrroga] = useState(0);

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
                <label>ID Cliente</label>
                <input onChange={(e) => setCi(e.target.value)} type="text"/>

                <label>Matricula</label>
                <input onChange={(e) => setMatricula(e.target.value)} type="text"/>

                <label>Forma de Pago</label>
                <select onChange={(e) => setFormaPago(e.target.value)}>

                </select>
                </div>
                
                <div id="rigth-div">
                    <div  id="checkbox">
                        <label>Seguro</label>
                        <input onChange={(e) => setSeguro(e.target.value)} type="checkbox"/>
                    </div>
                <label>Dias de Prorroga</label>
                <input onChange={(e) => setDiasProrroga(e.target.value)} type="number"/>
                </div>
            </form>

            <div id="btn-container">
                <button onClick={setVisible} className="button">Cancelar</button>
                <button onClick={handlePetition} className="button">Aceptar</button>
            </div>
        </div>
    </div>
  )
}

export default ModificarContrato