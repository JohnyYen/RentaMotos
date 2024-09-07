import { Button, Divider, Form, Input, message, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../App.css";
import axios from "axios";
import NuevoCliente from "./NuevoUsuario";
import { BrowserRouter, Link, Navigate } from "react-router-dom";
import AppRoutes from "../components/AppRoutes";
import UserAdmin from "../pages/UserPages/UserAdmin";

function Loguin() {
  const [abrirModal, setabrirModal] = useState(false);

  const Modal = (isOpen, closeModal) => {
    if (!isOpen) return null;

    return (
      <div className="loguin">
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <UserOutlined className="iconoUsuario" />
        </div>

        <div className="Registro">
          <Form className="miLoguin">
            <Form.Item
              label={<span style={{ color: "white" }}>Usuario</span>}
              name={"miUsuario"}
            >
              <Input placeholder="Ingrese su usuario" />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: "white" }}>Contraseña</span>}
              name={"micontraseña"}
            >
              <Input placeholder="Ingrese su contraseña" />
            </Form.Item>
          </Form>
        </div>

        <div className="Alternativa">
          <Button type="primary" htmlType="submit" block>
            Aceptar
          </Button>
          <div>
            <Button onClick={Registrar} type="link">
              Registrarse{" "}
            </Button>
            <NuevoCliente visible={visibleNuevoCliente} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="Loguin">
      <Modal isOpen={abrirModal} closeModal={() => setabrirModal(false)} />
    </div>
  );
}

export default Loguin;
