import React, { useContext, useState } from 'react';
import './styled-components/register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../../context/GlobalContext';
import { FloatButton, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { Cliente } from '../../model/Client';
import { User } from '../../model/User';

function Register() {
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [user_name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const { setUser, setClient } = useContext(GlobalContext);

  const navigate = useNavigate();
  const { t, i18n } = useTranslation('global'); // Usamos i18n para cambiar el idioma

  const clearInput = () => {
    setEmail('');
    setPassword('');
    setUserName('');
  };

  const handleLogger = () => {
    navigate('/createClient');
    clearInput();
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await axios.post('http://localhost:3000/api/auth/login', {
      user_name: user_name,
      password: password,
    });

    console.log(response.data.user);

    sessionStorage.setItem('jwt', JSON.stringify(response.data.token));

    console.log(response);
    if (response.status === 201) {
      const tipoUsuario = response.data.user.tipo_usuario;
      console.log(response.data.user.tipo_usuario);
      setUser(response.data.user);
      localStorage.setItem('userData', JSON.stringify(response.data.user));

      if (tipoUsuario === 1) {
        message.success(t('messageSuccess.loginSuccess'));
        navigate('/admin');
      }

      if (tipoUsuario === 2) {
        const idClient = response.data.user.id_cliente;
        const res = await axios.get(
          `http://localhost:3000/api/client/sample/${idClient}`,
          {
            headers: {
              Authorization: `Bearer ${response.data.token}`,
            },
          }
        );

        if (res.status === 200) {
          console.log(res.data);
          message.success(t('messageSuccess.loginSuccess'));
          const cliente = new Cliente(
            res.data[0].nombre,
            res.data[0].prim_apellido,
            res.data[0].idcliente,
            res.data[0].edad,
            res.data[0].sexo,
            res.data[0].municipio,
            res.data[0].num_cont,
            res.data[0].seg_nombre,
            res.data[0].seg_apellido
          );

          setClient(cliente);
          localStorage.setItem('clientData', JSON.stringify(cliente));
          const user = new User(
            response.data.user.nombre_usuario,
            response.data.user.contrasenia,
            response.data.user.email,
            response.data.id_cliente ?? null,
            response.data.tipo_usuario
          );
          setUser(user);
          localStorage.setItem('userData', JSON.stringify(user));
          navigate('/home');
        }
      }

      if (tipoUsuario === 3) {
        message.success(t('messageSuccess.loginSuccess'));
        navigate('/worker');
      }

      if (!tipoUsuario) message.info(t('messageError.notExistUser'));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password && user_name && email) {
      const client = {
        user_name,
        password,
        email,
      };

      setClient(client);
      navigate('/loginClient');
    }
  };

  // Función para cambiar el idioma
  const changeLanguage = (language) => {
    i18n.changeLanguage(language); // Cambia el idioma
    message.success(t('messageSuccess.languageChanged')); // Muestra un mensaje de éxito
  };

  return (
    <div className={`container ${visible ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form">
            <h2 className="title">{t('login.title')}</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                value={user_name}
                type="text"
                placeholder={t('login.usernamePlaceholder')}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                value={password}
                type="password"
                placeholder={t('login.passwordPlaceholder')}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button onClick={(e) => handleLogin(e)} className="btn solid">
              {t('login.loginButton')}
            </button>
          </form>
          <form className="sign-up-form"></form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content-login">
            <h3>{t('login.newHereTitle')}</h3>
            <p>{t('login.newHereDescription')}</p>
            <button
              onClick={handleLogger}
              className="btn transparent"
              id="sign-up-btn"
            >
              {t('login.signUpButton')}
            </button>
          </div>
        </div>
        <div className="panel right-panel">
          <div className="content-login">
            <h3>{t('login.oneOfUsTitle')}</h3>
            <p>{t('login.oneOfUsDescription')}</p>
            <button
              onClick={handleLogger}
              className="btn transparent"
              id="sign-in-btn"
            >
              {t('login.signInButton')}
            </button>
          </div>
        </div>
      </div>

      {/* FloatButton para cambiar idioma */}
      <FloatButton.Group shape="circle" style={{ right: 24 }}>
        <FloatButton
          description="ES"
          onClick={() => changeLanguage('es')} // Cambia a español
        />
        <FloatButton
          description="EN"
          onClick={() => changeLanguage('en')} // Cambia a inglés
        />
      </FloatButton.Group>
    </div>
  );
}

export default Register;