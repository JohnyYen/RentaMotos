import React from "react";
import WelcomeText from "./WelcomeText";
import SliderTopVentas from "./SliderTopVentas";



 const Welcome = () =>{
    return <div>
        <WelcomeText/>
          <h1>La satisfaccion del cliente es nuestra prioridad</h1>
          <h2>Top Rentas</h2>
          <SliderTopVentas/>
          <h2>Top Marcas</h2>
          <SliderTopVentas/>
    </div>
 }
 export default Welcome;