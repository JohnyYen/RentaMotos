import React from "react";
import { Slider ,Card, Flex, Alert, message} from "antd";
import { useNavigate } from "react-router-dom";

const SliderTopVentas = ({marca,modelo,image}) =>{
   
    return <Flex justify="space-between">
        <CardMoto marca={"hola"}/><CardMoto marca={"hola"}/>
        <CardMoto marca={"hola"}/><CardMoto marca={"hola"}/>
        <CardMoto marca={"hola"}/>
    </Flex>
}
const CardMoto = ({marca,modelo,image})=>{ 
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    return(
    <>
        {contextHolder} 
        <Card className="CardMoto" onClickCapture={ () =>{messageApi.open({
        onClick:()=>{ navigate('/loguin');},
        type: 'warning',
        content: <h3>Para acceder a este servicio debe estar logeado <h4>Pulse en este letrero para loguearse/regristrarse</h4></h3>,
       
      }); }}  size="default" content="hola" children={
        [<div>Marca:<div>{marca}</div></div>,
            <div>Modelo:<div>{modelo}</div></div>,
            <div>Image<div>{image}</div></div>,]} ></Card></>)
}

export default SliderTopVentas;