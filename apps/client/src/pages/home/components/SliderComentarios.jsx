import React from "react";
import { Slider ,Card, Flex, Alert, message, Avatar} from "antd";
import { useNavigate } from "react-router-dom";
import { Font } from "@react-pdf/renderer";

const SliderComentarios = () =>{
   
    return <Flex wrap justify="space-around">
        <CardComentario user={"juan"} comentar={"la mejor empresa"} image={'/src/assets/moto.png'}/>
        <CardComentario user={"pedro"} comentar={"que buenas ofertas"} image={'/src/assets/moto2.png'}/>
        <CardComentario user={"alfredo"} comentar={"wow los mejores"} image={'/src/assets/istockphoto-187133277-612x612.jpg'}/>
        <CardComentario user={"pepe"} comentar={"fernando gay"}image={'/src/assets/background.png'} />
        <CardComentario  user={"Alfonso"} comentar={"nunca decepcionan"} image={'/src/assets/moto.png'}/>
    </Flex>
}
const CardComentario = ({user,comentar,image})=>{ 
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    return(
    <>
        {contextHolder} 
        <Card  className="CardComentario" onClickCapture={ () =>{
            if(localStorage.getItem('login')){
                
            }else{
                messageApi.open({
        onClick:()=>{ navigate('/loguin');},
        type: 'warning',
        content: <h3>Para acceder a este servicio debe estar logeado <h4>Pulse en este letrero para loguearse/regristrarse</h4></h3>,
       
      });}
             }}  size="small"   children={
            
        [ <Flex wrap align="center" key={'comentFlex'} justify="start"><Avatar className="avatarComment" size={40}  src={image}></Avatar><div>
        Usuario:</div><div  className="userCommentName"key={'user'}>{user}</div><div>
        Comentario:</div><div className="commentText" key={'coment'}>{comentar}</div></Flex>  ,
       
            ]} >
                </Card></>)
}

export default SliderComentarios;