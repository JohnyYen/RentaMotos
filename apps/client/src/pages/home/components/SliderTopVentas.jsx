import React from "react";
import { Slider ,Card, Flex, Alert, message, Avatar} from "antd";
import { useNavigate } from "react-router-dom";

const SliderTopVentas = ({marca,modelo,image}) =>{
   
    return <Flex wrap justify="space-around">
        <CardMoto marca={"Jawa"} modelo={"jej"} image={'/src/assets/images/moto.png'}/><CardMoto marca={"909"} image={'/src/assets/images/moto.png'}/>
        <CardMoto marca={"Mtz"} image={'/src/assets/images/moto.png'}/><CardMoto marca={"hola"}  image={'/src/assets/images/moto.png'}/>
        <CardMoto marca={"Suzuki"} image={'/src/assets/images/moto.png'} />
    </Flex>
}
const CardMoto = ({marca,modelo,image})=>{ 
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    return(
    <>
        {contextHolder} 
        <Card hoverable  className="CardMoto"
        cover={
            <img a
             
              src= {image}
            />
          }
         onClickCapture={ () =>{
            if(localStorage.getItem('login') === 'true'){
                navigate('/home/motosCliente');
            }else{messageApi.open({
        onClick:()=>{ navigate('/loguin');},
        type: 'warning',
        content: <h3>Para acceder a este servicio debe estar logeado <h4>Pulse en este letrero para loguearse/regristrarse</h4></h3>,
       
      }); }
            }}  size="default"  ><Card.Meta
                    title={`Marca: ${marca}`}
                    description={`Modelo: ${modelo} `}
                  /></Card></>)
}

export default SliderTopVentas;
/*<Card
                  hoverable
                  actions={[
                    <Button onClick={() => setVisible(true)} style={{margin:10}} type="primary">Rentar</Button>
                  ]}
                  key={item.key}
                  style={{ width: 240 }}
                  cover={
                    <img
                      alt="example"
                      src="apps\client\src\assets\moto.png"
                    />
                  }
                >
                  <Card.Meta
                    title={`Matricula: ${item.matricula}`}
                    description={`Marca: ${item.marca} | Modelo: ${item.modelo} | Situación: ${item.situacion} | Color: ${item.color} | Km: ${item.kmRecorridos}`}
                  />
              
                </Card>*/