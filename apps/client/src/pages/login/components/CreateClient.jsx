import React, { useState } from "react";
import { Form, Button, Steps, Input, message } from "antd";
import "../styled-components/createUser.css";
import PersonalInformation from "./PersonalInformation";
import ContactInformation from './ContactInformation';
import IdentityInformation from './IdentityInformation';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Step } = Steps;

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  //Variables
  const [nombre, setNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [carnetIdentidad, setCarnetIdentidad] = useState("");
  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [numeroContacto, setNumeroContacto] = useState("");

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handlePetition = async () => {
    
    if(nombre && segundoApellido && segundoNombre && primerApellido
      && carnetIdentidad && edad && sexo && municipio && numeroContacto)
      {
        const cliente = {
          nombre,
          segundoNombre,
          primerApellido,
          segundoApellido,
          carnetIdentidad,
          edad,
          sexo,
          municipio,
          numeroContacto,
        };

        const response = await axios.post("localhost/3000/api/client", cliente)

        if(response.status === 201)
          useNavigate('/home');

        message.error("No se pudo crear el cliente");
      }
  };

  const steps = [
    {
      title: "Información Personal",
      content: <PersonalInformation 
       setPrimNombre={setNombre}
       setSegNombre={setSegundoNombre}
       setPrimApellido={setPrimerApellido}
       setSegApellido={setSegundoApellido}
       form={form}
       
       />,
    },
    {
      title: "Información de Identificación",
      content: <IdentityInformation 
      setAge={setEdad}
      setId={setCarnetIdentidad}
      setSex={setSexo}

      form={form} />,
    },
    {
      title: "Información de Contacto",
      content: <ContactInformation
      setMun={setMunicipio}
      setContact={setNumeroContacto}
      form={form} />,
    },
  ];

  return (
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
  );
};

export default App;