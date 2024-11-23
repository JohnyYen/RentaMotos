import React from "react";
import { Slider ,Card, Flex, Alert, message, Avatar} from "antd";
import { useNavigate } from "react-router-dom";

const SliderTopVentas = ({marca,modelo,image}) =>{
   
    return <Flex justify="space-between">
        <CardMoto marca={"Jawa"} modelo={"jej"} image={'/src/assets/moto.png'}/><CardMoto marca={"909"} image={'/src/assets/moto.png'}/>
        <CardMoto marca={"Mtz"} image={'/src/assets/moto.png'}/><CardMoto marca={"hola"}  image={'/src/assets/moto.png'}/>
        <CardMoto marca={"Suzuki"} image={'/src/assets/moto.png'} />
    </Flex>
}
const CardMoto = ({marca,modelo,image})=>{ 
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    return(
    <>
        {contextHolder} 
        <Card className="CardMoto" onClickCapture={ () =>{
            if(localStorage.getItem('login')){
                navigate('/home/motosCliente');
            }
            messageApi.open({
        onClick:()=>{ navigate('/loguin');},
        type: 'warning',
        content: <h3>Para acceder a este servicio debe estar logeado <h4>Pulse en este letrero para loguearse/regristrarse</h4></h3>,
       
      }); }}  size="default"  children={
            
        [   <Flex  justify="center"><Avatar shape="square" size={130} src ={image}></Avatar></Flex>,
            <div>Marca: {marca}</div>,
            <div>Modelo: {modelo}</div>,
                ]} ></Card></>)
}

export default SliderTopVentas;