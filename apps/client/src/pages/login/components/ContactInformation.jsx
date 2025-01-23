import React from "react";
import { Form, Input } from "antd";
import axios from 'axios';




const ContactInformation = ({ form, setMun, setContact }) => {
  return (
    <>
      <Form.Item
        name="municipio"
        label="Municipio"
        rules={[{ required: true, message: "Este campo es obligatorio" }]}
      >
        <Input placeholder="Ingrese su municipio" />
      </Form.Item>

      <Form.Item
        name="numeroContacto"
        label="Número de Contacto"
        rules={[{ required: true, message: "Este campo es obligatorio" }]}
      >
        <Input onChange={(e) => setContact(e.target.value)} placeholder="Ingrese su número de contacto" />
      </Form.Item>
    </>
  );
};

export default ContactInformation;