import React from "react";
import { Form, Input, Select } from "antd";

const ContactInformation = ({ form, setMun, setContact }) => {
  // Lista de municipios de La Habana, Cuba
  const municipiosHabana = [
    "Arroyo Naranjo",
    "Boyeros",
    "Centro Habana",
    "Cerro",
    "Cotorro",
    "Diez de Octubre",
    "Guanabacoa",
    "La Habana del Este",
    "La Habana Vieja",
    "La Lisa",
    "Marianao",
    "Playa",
    "Plaza de la Revolución",
    "Regla",
    "San Miguel del Padrón",
  ];

  return (
    <>
      {/* Municipio */}
      <Form.Item
        name="municipio"
        label="Municipio"
        rules={[{ required: true, message: "Este campo es obligatorio" }]}
        validateTrigger="onSubmit" // Validar solo en submit
      >
        <Select
          onChange={(value) => setMun(value)}
          placeholder="Seleccione su municipio"
          style={{ width: "300px" }} // Ancho fijo
        >
          {municipiosHabana.map((municipio) => (
            <Select.Option key={municipio} value={municipio}>
              {municipio}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* Número de Contacto */}
      <Form.Item
        name="numeroContacto"
        label="Número de Contacto"
        rules={[
          { required: true, message: "Este campo es obligatorio" },
          { len: 8, message: "El número de contacto debe tener exactamente 8 dígitos" },
          {
            pattern: /^\d+$/, // Solo números
            message: "El número de contacto debe contener solo números",
          },
        ]}
        validateTrigger="onSubmit" // Validar solo en submit
      >
        <Input
          onChange={(e) => setContact(e.target.value)}
          placeholder="Ingrese su número de contacto"
          maxLength={8} // Limita la entrada a 8 caracteres
          style={{ width: "300px" }} // Ancho fijo
        />
      </Form.Item>
    </>
  );
};

export default ContactInformation;