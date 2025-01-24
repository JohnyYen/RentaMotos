import React from "react";
import { Form, Input } from "antd";

const PersonalInformation = ({ setPrimNombre, setSegNombre, setPrimApellido, setSegApellido }) => {
  return (
    <>  
        <Form.Item
          name="primerNombre"
          label="Primer Nombre"
          rules={[{ required: true, message: "Este campo es obligatorio" }]}
        >
          <Input onChange={(e) => setPrimNombre(e.target.value)} placeholder="Ingrese su primer nombre" />
        </Form.Item>

        <Form.Item name="segundoNombre" label="Segundo Nombre">
          <Input onChange={(e) => setSegNombre(e.target.value)} placeholder="Ingrese su segundo nombre" />
        </Form.Item>

        <Form.Item
          name="primerApellido"
          label="Primer Apellido"
          rules={[{ required: true, message: "Este campo es obligatorio" }]}
        >
          <Input onChange={(e) => setPrimApellido(e.target.value)} placeholder="Ingrese su primer apellido" />
        </Form.Item>

        <Form.Item name="segundoApellido" label="Segundo Apellido">
          <Input onChange={(e) => setSegApellido(e.target.value)} placeholder="Ingrese su segundo apellido" />
        </Form.Item>
    </>
  );
};

export default PersonalInformation;