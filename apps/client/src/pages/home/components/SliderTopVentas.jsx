import React from "react";
import { Slider ,Card, Flex, Alert, message, Avatar} from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
    const [t] = useTranslation('global');

    return(
    <>
        {contextHolder} 
        <Card hoverable  className="CardMoto"
        cover={
            <img             
              src= {image}
            />
          }
         onClickCapture={ () =>{
            if(localStorage.getItem('login') === 'true'){
                navigate('/home/motosCliente');
            }else{messageApi.open({
        onClick:()=>{ navigate('/loguin');},
        type: 'warning',
        content: (
          <div
            onClick={() => navigate("/loguin")}
            style={{ cursor: "pointer" }}
          >
            <h3>{t("sideBar.loginWarning")}</h3>
            <h4>{t("sideBar.loginPrompt")}</h4>
          </div>
        ),
        duration: 3,
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