import React from "react";
import { Form, Input, Select } from "antd";

const IdentityInformation = ({ form, setId, setAge, setSex }) => {
  return (
    <>
      <Form.Item
        name="carnetIdentidad"
        label="Carnet de Identidad"
        rules={[{ required: true, message: "Este campo es obligatorio" }]}
      >
        <Input onChange={(e) => setId(e.target.value)} placeholder="Ingrese su carnet de identidad" />
      </Form.Item>

      <Form.Item
        name="edad"
        label="Edad"
        rules={[{ required: true, message: "Este campo es obligatorio" }]}
      >
        <Input onChange={(e) => setAge(e.target.value)} type="number" placeholder="Ingrese su edad" />
      </Form.Item>

      <Form.Item
        name="sexo"
        label="Sexo"
        rules={[{ required: true, message: "Este campo es obligatorio" }]}
      >
        <Select onSelect={(e) => setSex(e)} placeholder="Seleccione su sexo">
          <Select.Option value="M">Masculino</Select.Option>
          <Select.Option value="F">Femenino</Select.Option>
        </Select>
      </Form.Item>
    </>
  );
};

export default IdentityInformation;