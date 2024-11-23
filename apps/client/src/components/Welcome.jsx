import React from "react";
import WelcomeText from "./WelcomeText";
import SliderTopVentas from "./SliderTopVentas";



 const Welcome = () =>{
    return <div>
        <WelcomeText/>
          <h1>La satisfaccion del cliente es nuestra prioridad</h1>
          <div className="espaciador">
            Sector Promocional
          </div>
          <h2>Top Rentas</h2>
          <SliderTopVentas/>
          <h2>Comentarios destacados</h2>
          <SliderTopVentas/>
    </div>
 }
 export default Welcome;