import React, { useContext, useState } from "react";
import { Form, Button, Steps, Input, message } from "antd";
import "../styled-components/createUser.css";
import PersonalInformation from "./PersonalInformation";
import ContactInformation from "./ContactInformation";
import IdentityInformation from "./IdentityInformation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../context/GlobalContext";
import UserInformation from "./UserInformation";
import { User } from "../../../model/User";
import { Cliente } from "../../../model/Client";

const { Step } = Steps;

const CreateClient = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  //Variables
  const { setClient, setUser } = useContext(GlobalContext);
  const [nombre, setNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [carnetIdentidad, setCarnetIdentidad] = useState("");
  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [numeroContacto, setNumeroContacto] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handlePetition = async () => {
    if (
      nombre &&
      primerApellido &&
      carnetIdentidad &&
      edad &&
      sexo &&
      municipio &&
      numeroContacto
    ) {
      // const cliente = {
      //   nombre: nombre,
      //   segNombre: segundoNombre || "",
      //   primApellido: primerApellido,
      //   segApellido: segundoApellido || "",
      //   idCliente: carnetIdentidad,
      //   edad: edad,
      //   sexo: sexo,
      //   municipio: municipio,
      //   numCont: numeroContacto,
      // };

      const cliente = new Cliente(
        nombre, 
        primerApellido, 
        carnetIdentidad, 
        edad, 
        sexo, 
        municipio, 
        numeroContacto, 
        segundoNombre, 
        segundoApellido
      );

      // const user = {
      //   user_name: username,
      //   password: password,
      //   email: email,
      //   ci: carnetIdentidad,
      // };

      const user = new User(username, password, email, carnetIdentidad,2);
      console.log(cliente);
      console.log(user);
      const respClient = await axios.post(
        "http://localhost:3000/api/client",
        cliente.toJSON()
      );
      const respUser = await axios.post(
        "http://localhost:3000/api/auth/register",
        user.toJSON()
      );

      setClient(cliente);
      localStorage.setItem('clientData', JSON.stringify(cliente));
      setUser(user);
      localStorage.setItem('userData', JSON.stringify(user));
      sessionStorage.setItem("jwt", JSON.stringify(respUser.data.token));

      navigate("/home");
    }
  };

  const steps = [
    {
      title: "Información de Usuario",
      content: (
        <UserInformation
          setUsername={setUsername}
          setPassword={setPassword}
          setEmail={setEmail}
        />
      ),
    },
    {
      title: "Información Personal",
      content: (
        <PersonalInformation
          setPrimNombre={setNombre}
          setSegNombre={setSegundoNombre}
          setPrimApellido={setPrimerApellido}
          setSegApellido={setSegundoApellido}
        />
      ),
    },
    {
      title: "Información de Identificación",
      content: (
        <IdentityInformation
          setAge={setEdad}
          setId={setCarnetIdentidad}
          setSex={setSexo}
        />
      ),
    },
    {
      title: "Información de Contacto",
      content: (
        <ContactInformation
          setMun={setMunicipio}
          setContact={setNumeroContacto}
          form={form}
        />
      ),
    },
  ];

  return (
    <div className="body">
      <div className="app-container">
        <Steps current={currentStep} className="steps">
          {steps.map((step, index) => (
            <Step key={index} title={step.title} />
          ))}
        </Steps>

        <div className="form-container">
          <Form form={form} layout="vertical">
            <div className="sections-wrapper">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`section-content ${
                    currentStep === index ? "active" : "inactive"
                  }`}
                >
                  {step.content}
                </div>
              ))}
            </div>
          </Form>
        </div>

        <div className="navigation-buttons">
          {currentStep > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={prevStep}>
              Anterior
            </Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button type="primary" onClick={nextStep}>
              Siguiente
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type="primary" onClick={() => handlePetition()}>
              Finalizar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateClient;
