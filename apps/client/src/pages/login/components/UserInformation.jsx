import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";

const UserInformation = ({ setUsername, setPassword, setEmail }) => {
  const [form] = Form.useForm();

  const onFinishFailed = (errorInfo) => {
    console.error("Error en el formulario:", errorInfo);
    message.error("Por favor, corrige los errores en el formulario");
  };

  return (
    <Form
      form={form}
      name="createUserForm"
      onFinishFailed={onFinishFailed}
      layout="vertical"
      autoComplete="off"
    >
      {/* Campo para el nombre de usuario */}
      <Form.Item
        name="username"
        label="Nombre de usuario"
        rules={[
          { required: true, message: "Este campo es obligatorio" },
          { min: 3, message: "El nombre de usuario debe tener al menos 3 caracteres" },
        ]}
      >
        <Input onChange={(e) => setUsername(e.target.result)} placeholder="Ingrese su nombre de usuario" />
      </Form.Item>

      {/* Campo para el email */}
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Este campo es obligatorio" },
          { type: "email", message: "Ingrese un email válido" },
        ]}
      >
        <Input onChange={(e) => setEmail(e.target.result)} placeholder="Ingrese su email" />
      </Form.Item>

      {/* Campo para la contraseña */}
      <Form.Item
        name="password"
        label="Contraseña"
        rules={[
          { required: true, message: "Este campo es obligatorio" },
          { min: 6, message: "La contraseña debe tener al menos 6 caracteres" },
        ]}
      >
        <Input.Password onChange={(e) => setPassword(e.target.result)} placeholder="Ingrese su contraseña" />
      </Form.Item>

      {/* Campo para confirmar la contraseña */}
      <Form.Item
        name="confirmPassword"
        label="Confirmar contraseña"
        dependencies={["password"]} // Depende del campo "password"
        rules={[
          { required: true, message: "Este campo es obligatorio" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("Las contraseñas no coinciden");
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirme su contraseña" />
      </Form.Item>

    </Form>
  );
};

export default UserInformation;