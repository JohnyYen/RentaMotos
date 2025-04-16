import { Flex } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

const FaqBody = () => {
  const [t] = useTranslation("global");

  // Estilos en línea
  const styles = {
    container: {
      backgroundColor: "#E6F7FF", // Azul claro suave
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Sombra suave
      maxWidth: "800px", // Limita el ancho máximo
      margin: "0 auto", // Centra el contenedor
    },
    title: {
      color: "#0056b3", // Azul oscuro
      textAlign: "center",
      fontSize: "2.5rem",
      marginBottom: "20px",
    },
    section: {
      backgroundColor: "#ffffff", // Fondo blanco
      padding: "15px",
      marginBottom: "15px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Sombra suave
    },
    subtitle: {
      color: "#0073e6", // Azul más intenso
      fontSize: "1.5rem",
      marginBottom: "10px",
    },
    description: {
      color: "#333333", // Color de texto oscuro
      fontSize: "1rem",
      lineHeight: "1.5",
    },
  };

  return (
    <Flex vertical style={styles.container}>
      <h1 style={styles.title}>{t('faq.title')}</h1>

      <div style={styles.section}>
        <h2 style={styles.subtitle}>{t('faq.eligibility.title')}</h2>
        <p style={styles.description}>{t('faq.eligibility.description')}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subtitle}>{t('faq.reservation.title')}</h2>
        <p style={styles.description}>{t('faq.reservation.description')}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subtitle}>{t('faq.rates.title')}</h2>
        <p style={styles.description}>{t('faq.rates.description')}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subtitle}>{t('faq.usage.title')}</h2>
        <p style={styles.description}>{t('faq.usage.description')}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subtitle}>{t('faq.insurance.title')}</h2>
        <p style={styles.description}>{t('faq.insurance.description')}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subtitle}>{t('faq.return.title')}</h2>
        <p style={styles.description}>{t('faq.return.description')}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subtitle}>{t('faq.cancellation.title')}</h2>
        <p style={styles.description}>{t('faq.cancellation.description')}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subtitle}>{t('faq.liability.title')}</h2>
        <p style={styles.description}>{t('faq.liability.description')}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subtitle}>{t('faq.modifications.title')}</h2>
        <p style={styles.description}>{t('faq.modifications.description')}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subtitle}>{t('faq.jurisdiction.title')}</h2>
        <p style={styles.description}>{t('faq.jurisdiction.description')}</p>
      </div>
    </Flex>
  );
};

export default FaqBody;