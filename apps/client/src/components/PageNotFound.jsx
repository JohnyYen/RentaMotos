import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Página no encontrada</h1>
      <p style={styles.message}>
        Lo sentimos, la página que estás buscando no existe.
      </p>
      <button onClick={handleGoBack} style={styles.button}>
        Volver a la página anterior
      </button>
    </div>
  );
};

// Estilos para el componente
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Ocupa toda la altura de la pantalla
    backgroundColor: '#e6f7ff', // Azul claro para el fondo
    color: '#0056b3', // Azul oscuro para el texto
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#0073e6', // Azul más intenso para el título
  },
  message: {
    fontSize: '1.2rem',
    marginBottom: '30px',
    color: '#0056b3', // Azul oscuro para el mensaje
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff', // Texto blanco
    backgroundColor: '#0073e6', // Azul intenso para el botón
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default PageNotFound;