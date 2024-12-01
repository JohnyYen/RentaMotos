import React from "react";
import WelcomeText from "./WelcomeText";
import SliderTopVentas from "./SliderTopVentas";
import SliderComentarios from "./SliderComentarios";
import { Flex } from "antd";



 const Welcome = () =>{
    return <div>
       
          <Flex wrap justify="center"> <WelcomeText/><h1 className="satisfaccion">La satisfaccion del cliente es nuestra prioridad</h1></Flex>
          <div className="espaciador">
            Sector Promocional
          </div>
          <h2 className="subtitulo">Top Rentas</h2>
          <SliderTopVentas/>
          <h2 className="subtitulo">Comentarios destacados</h2>
          <SliderComentarios/>
    </div>
 }
 export default Welcome;