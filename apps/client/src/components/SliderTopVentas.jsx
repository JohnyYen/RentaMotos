import React from "react";
import { Slider ,Card, Flex, Alert} from "antd";


const SliderTopVentas = ({marca,modelo,image}) =>{
    return <Flex justify="space-between">
        <CardMoto marca={"hola"}/><CardMoto marca={"hola"}/>
        <CardMoto marca={"hola"}/><CardMoto marca={"hola"}/>
        <CardMoto marca={"hola"}/>
    </Flex>
}
const CardMoto = ({marca,modelo,image})=>{
    return<Card onClickCapture={()=>alert()}  size="default" content="hola" children={
        [<div>Marca:<div>{marca}</div></div>,
            <div>Modelo:<div>{modelo}</div></div>,
            <div>Image<div>{image}</div></div>,]} ></Card>;
}

export default SliderTopVentas;