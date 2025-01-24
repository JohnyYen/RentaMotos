import React from "react";
import { Form, Input } from "antd";

const PersonalInformation = ({ setPrimNombre, setSegNombre, setPrimApellido, setSegApellido }) => {
  return (
    <>
      {/* Primer Nombre */}
      <Form.Item
        name="primerNombre"
        label="Primer Nombre"
        rules={[
          { required: true, message: "Este campo es obligatorio" },
          { min: 3, message: "El campo debe tener al menos 3 caracteres" },
        ]}
      >
        <Input
          onChange={(e) => setPrimNombre(e.target.value)}
          placeholder="Ingrese su primer nombre"
          style={{ width: "300px" }} // Ancho fijo
        />
      </Form.Item>

      {/* Segundo Nombre */}
      <Form.Item
        name="segundoNombre"
        label="Segundo Nombre"
        rules={[
          { min: 3, message: "El campo debe tener al menos 3 caracteres" },
        ]}
      >
        <Input
          onChange={(e) => setSegNombre(e.target.value)}
          placeholder="Ingrese su segundo nombre"
          style={{ width: "300px" }} // Ancho fijo
        />
      </Form.Item>

      {/* Primer Apellido */}
      <Form.Item
        name="primerApellido"
        label="Primer Apellido"
        rules={[
          { required: true, message: "Este campo es obligatorio" },
          { min: 3, message: "El campo debe tener al menos 3 caracteres" },
        ]}
      >
        <Input
          onChange={(e) => setPrimApellido(e.target.value)}
          placeholder="Ingrese su primer apellido"
          style={{ width: "300px" }} // Ancho fijo
        />
      </Form.Item>

      {/* Segundo Apellido */}
      <Form.Item
        name="segundoApellido"
        label="Segundo Apellido"
        rules={[
          { min: 3, message: "El campo debe tener al menos 3 caracteres" },
        ]}
      >
        <Input
          onChange={(e) => setSegApellido(e.target.value)}
          placeholder="Ingrese su segundo apellido"
          style={{ width: "300px" }} // Ancho fijo
        />
      </Form.Item>
    </>
  );
};

export default PersonalInformation;