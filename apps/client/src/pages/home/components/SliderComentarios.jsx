import React from "react";
import { Card, Flex, message, Avatar } from "antd";
import { useNavigate } from "react-router-dom";

const SliderComentarios = () => {
  return (
    <Flex wrap justify="space-around" style={styles.sliderContainer}>
      <CardComentario user={"juan"} comentar={"la mejor empresa"} image={'/src/assets/moto.png'} />
      <CardComentario user={"pedro"} comentar={"que buenas ofertas"} image={'/src/assets/moto2.png'} />
      <CardComentario user={"pepe"} comentar={"fernando gay"} image={'/src/assets/background.png'} />
      <CardComentario user={"Alfonso"} comentar={"nunca decepcionan"} image={'/src/assets/moto.png'} />
    </Flex>
  );
};

const CardComentario = ({ user, comentar, image }) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      <Card
        style={styles.cardComentario}
        onClickCapture={() => {
          if (localStorage.getItem('login')) {
          } else {
            messageApi.open({
              onClick: () => { navigate('/loguin'); },
              type: 'warning',
              content: (
                <div
                  onClick={() => navigate("/loguin")}
                  style={{ cursor: "pointer" }}
                >
                  <h3>Debes iniciar sesión</h3>
                  <h4>Haz clic aquí para loguearte</h4>
                </div>
              ),
              duration: 3,
            });
          }
        }}
        size="small"
      >
        <Flex wrap align="center" justify="start" style={styles.comentarioContent}>
          <Avatar style={styles.avatarComment} size={40} src={image} />
          <div style={styles.userLabel}>Usuario:</div>
          <div style={styles.userCommentName}>{user}</div>
          <div style={styles.commentLabel}>Comentario:</div>
          <div style={styles.commentText}>{comentar}</div>
        </Flex>
      </Card>
    </>
  );
};

export default SliderComentarios;

// Estilos en un objeto styles
const styles = {
  sliderContainer: {
    backgroundColor: '#e6f7ff', // Fondo azul claro
    padding: '20px',
    borderRadius: '10px',
  },
  cardComentario: {
    backgroundColor: '#f0f8ff', // Fondo azul muy claro
    border: '1px solid #add8e6', // Borde azul claro
    borderRadius: '10px',
    width: '300px',
    margin: '10px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardComentarioHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  comentarioContent: {
    padding: '10px',
  },
  avatarComment: {
    border: '2px solid #1890ff', // Borde azul para el avatar
  },
  userLabel: {
    color: '#1890ff', // Color azul para el texto "Usuario"
    fontWeight: 'bold',
    marginLeft: '10px',
  },
  userCommentName: {
    color: '#40a9ff', // Color azul claro para el nombre del usuario
    marginLeft: '5px',
    fontWeight: 'bold',
  },
  commentLabel: {
    color: '#1890ff', // Color azul para el texto "Comentario"
    fontWeight: 'bold',
    marginLeft: '10px',
    marginTop: '5px',
  },
  commentText: {
    color: '#40a9ff', // Color azul claro para el texto del comentario
    marginLeft: '5px',
    fontStyle: 'italic',
  },
};