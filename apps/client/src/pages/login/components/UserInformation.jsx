import React from "react";
import { Form, Input } from "antd";

const UserInformation = ({ setUsername, setPassword, setEmail }) => {
  return (
    <>
      {/* Campo para el nombre de usuario */}
      <Form.Item
        name="username"
        label="Nombre de usuario"
        rules={[
          { required: true, message: "Este campo es obligatorio" },
          {
            min: 3,
            message: "El nombre de usuario debe tener al menos 3 caracteres",
          },
        ]}
      >
        <Input
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingrese su nombre de usuario"
          style={{ width: "300px" }} // Ancho fijo
        />
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
        <Input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingrese su email"
          style={{ width: "300px" }} // Ancho fijo
        />
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
        <Input.Password
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingrese su contraseña"
          style={{ width: "300px" }} // Ancho fijo
        />
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
        <Input.Password
          placeholder="Confirme su contraseña"
          style={{ width: "300px" }} // Ancho fijo
        />
      </Form.Item>
    </>
  );
};

export default UserInformation;