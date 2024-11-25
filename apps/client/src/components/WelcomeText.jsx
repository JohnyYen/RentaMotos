import React from "react";
import Icon from "@ant-design/icons";
  import { useTranslation } from "react-i18next";
  import "../App.css";
  import "boxicons";
  import { Card, Divider, FloatButton, Image, Layout, Space } from "antd";
import { GiSpain } from "react-icons/gi";
import { IoDocumentOutline } from "react-icons/io5";
import { Flex } from "antd";
import { BiCycling } from "react-icons/bi";
import { PiMotorcycleBold, PiMotorcycleDuotone, PiMotorcycleFill } from "react-icons/pi";

const {Content} = Layout;

const WelcomeText = ()=>{
    
    return (
         <Flex wrap align="center" justify="center" vertical = "true">
            <div className="nombreEmpresa" >
            <box-icon
          name="cycling"
          size="5rem"
          color="black"
          style={{ marginTop: "3rem" }}
        ></box-icon>
                </div>
                <div className="nombreEmpresa">Renta Motos</div>
                <div className="subscribete">Registrate</div>
                <div className="slogan">Y</div>
                <div className="slogan">Consulta todos los servicios</div>
                <div className="slogan">Disponibles</div>       
                              
        </Flex>
    
    );
};
export default WelcomeText;