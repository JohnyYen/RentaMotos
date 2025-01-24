import React from "react";
import { Form, Input, Select } from "antd";

const IdentityInformation = ({ form, setId, setAge, setSex }) => {
  return (
    <>
      {/* Carnet de Identidad */}
      <Form.Item
        name="carnetIdentidad"
        label="Carnet de Identidad"
        rules={[
          { required: true, message: "Este campo es obligatorio" },
          { len: 11, message: "El carnet de identidad debe tener exactamente 11 caracteres" },
          {
            pattern: /^\d+$/, // Solo números
            message: "El carnet de identidad debe contener solo números",
          },
        ]}
        validateTrigger="onSubmit" // Validar solo en submit
      >
        <Input
          onChange={(e) => setId(e.target.value)}
          placeholder="Ingrese su carnet de identidad"
          maxLength={11} // Limita la entrada a 11 caracteres
          style={{ width: "300px" }} // Ancho fijo
        />
      </Form.Item>

      {/* Edad */}
      <Form.Item
        name="edad"
        label="Edad"
        rules={[
          { required: true, message: "Este campo es obligatorio" },
          {
            type: "number",
            message: "La edad debe ser un número válido",
          },
          {
            validator: (_, value) => {
              if (value > 17) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("La edad debe ser mayor que 17"));
            },
          },
        ]}
        validateTrigger="onSubmit" // Validar solo en submit
      >
        <Input
          onChange={(e) => setAge(e.target.value)}
          type="number"
          placeholder="Ingrese su edad"
          style={{ width: "300px" }} // Ancho fijo
        />
      </Form.Item>

      {/* Sexo */}
      <Form.Item
        name="sexo"
        label="Sexo"
        rules={[{ required: true, message: "Este campo es obligatorio" }]}
        validateTrigger="onSubmit" // Validar solo en submit
      >
        <Select
          onSelect={(e) => setSex(e)}
          placeholder="Seleccione su sexo"
          style={{ width: "300px" }} // Ancho fijo
        >
          <Select.Option value="M">Masculino</Select.Option>
          <Select.Option value="F">Femenino</Select.Option>
        </Select>
      </Form.Item>
    </>
  );
};

export default IdentityInformation;