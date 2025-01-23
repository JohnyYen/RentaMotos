import React, { useContext } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { GlobalContext } from "../context/GlobalContext";

// Define estilos para el documento
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 12,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    marginBottom: 30,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
  container: {
    border: "1px solid #ccc",
    padding: 20,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    marginBottom: 30,
  },
  field: {
    marginBottom: 10,
  },
  fieldLabel: {
    fontWeight: "bold",
    marginRight: 10,
    display: "inline-block",
  },
  fieldValue: {
    display: "inline-block",
  },
  signatureSection: {
    marginTop: 40,
    textAlign: "center",
  },
  signatureLine: {
    marginTop: 50,
    borderBottom: "1px solid #000",
    width: "50%",
    margin: "0 auto",
  },
  signatureLabel: {
    marginTop: 5,
  },
});

const DocumentPDF = ({ dataContract }) => {

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Contrato de Alquiler</Text>

        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.field}>
              <Text style={styles.fieldLabel}>Nombre:</Text>
              <Text style={styles.fieldValue}>
                {" "}
                {dataContract['nombre'] || "N/A"}
              </Text>
            </Text>
            <Text style={styles.field}>
              <Text style={styles.fieldLabel}>Fecha de Inicio:</Text>
              <Text style={styles.fieldValue}>
                {" "}
                {dataContract["fecha de inicio"] || "N/A"}
              </Text>
            </Text>
            <Text style={styles.field}>
              <Text style={styles.fieldLabel}>Fecha Fin:</Text>
              <Text style={styles.fieldValue}>
                {" "}
                {dataContract["fechaFin"] || "N/A"}
              </Text>
            </Text>
            <Text style={styles.field}>
              <Text style={styles.fieldLabel}>Forma de Pago:</Text>
              <Text style={styles.fieldValue}>
                {" "}
                {dataContract["forma de pago"] || "N/A"}
              </Text>
            </Text>
            <Text style={styles.field}>
              <Text style={styles.fieldLabel}>Importe Total:</Text>
              <Text style={styles.fieldValue}>
                {" "}
                {dataContract["importe total"] || "N/A"}
              </Text>
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.field}>
              <Text style={styles.fieldLabel}>Marca:</Text>
              <Text style={styles.fieldValue}>
                {" "}
                {dataContract.marca || "N/A"}
              </Text>
            </Text>
            <Text style={styles.field}>
              <Text style={styles.fieldLabel}>Matrícula:</Text>
              <Text style={styles.fieldValue}>
                {" "}
                {dataContract.matricula || "N/A"}
              </Text>
            </Text>
            <Text style={styles.field}>
              <Text style={styles.fieldLabel}>Modelo:</Text>
              <Text style={styles.fieldValue}>
                {" "}
                {dataContract.modelo || "N/A"}
              </Text>
            </Text>
            <Text style={styles.field}>
              <Text style={styles.fieldLabel}>Prórroga:</Text>
              <Text style={styles.fieldValue}>
                {" "}
                {dataContract.prorroga || 0}
              </Text>
            </Text>
            <Text style={styles.field}>
              <Text style={styles.fieldLabel}>Seguro Adicional:</Text>
              <Text style={styles.fieldValue}>
                {" "}
                {dataContract["seguro adicional"] || "No"}
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.signatureSection}>
          <Text>Firma del Arrendatario:</Text>
          <View style={styles.signatureLine} />
        </View>
      </Page>
    </Document>
  );
};

export default DocumentPDF;
