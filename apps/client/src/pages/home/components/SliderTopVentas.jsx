import React from "react";
import { Slider, Card, Flex, message, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Estilos en un objeto styles
const styles = {
  sliderContainer: {
    padding: '20px',
    borderRadius: '10px',
  },
  cardMoto: {
    backgroundColor: '#f0f8ff', // Fondo azul muy claro
    border: '1px solid #add8e6', // Borde azul claro
    borderRadius: '10px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardImage: {
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    height: '200px',
    objectFit: 'cover',
  },
  cardMeta: {
    padding: '16px',
    backgroundColor: '#f0f8ff', // Fondo azul muy claro
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
  },
};

const SliderTopVentas = () => {
  return (
    <Flex wrap justify="space-around" style={styles.sliderContainer}>
      <CardMoto marca={"Jawa"} modelo={"jej"} image={'/src/assets/images/moto.png'} />
      <CardMoto marca={"909"} modelo={"Honda"} image={'/src/assets/images/moto.png'} />
      <CardMoto marca={"Mtz"} modelo={"2tz"} image={'/src/assets/images/moto.png'} />
      <CardMoto marca={"hola"} modelo={"kwua"} image={'/src/assets/images/moto.png'} />
      <CardMoto marca={"Suzuki"} modelo={"Tente"} image={'/src/assets/images/moto.png'} />
    </Flex>
  );
};

const CardMoto = ({ marca, modelo, image }) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [t] = useTranslation('global');

  return (
    <>
      {contextHolder}
      <Card
        hoverable
        style={styles.cardMoto}
        cover={
          <img
            src={image}
            alt={`${marca} ${modelo}`}
            style={styles.cardImage}
          />
        }
        onClick={() => {
          if (sessionStorage.getItem('jwt')) {
            navigate('/home/motosCliente');
          } else {
            messageApi.open({
              onClick: () => { navigate('/loguin'); },
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
            });
          }
        }}
        size="default"
      >
        <Card.Meta
          title={`Marca: ${marca}`}
          description={`Modelo: ${modelo}`}
          style={styles.cardMeta}
        />
      </Card>
    </>
  );
};

export default SliderTopVentas;

