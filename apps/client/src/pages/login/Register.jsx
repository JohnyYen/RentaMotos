import React, { useContext, useState } from 'react'
import '../login/styled-components/register.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../../context/GlobalContext';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

function Register() {
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [user_name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const {setUser, setClient} = useContext(GlobalContext);

  const navigate = useNavigate(); 
  const [t] = useTranslation("global");

  const handleLogger = () => {
    setVisible(!visible)
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      user_name: user_name,
      password: password
    });

    sessionStorage.setItem('jwt', JSON.stringify(response.data.token));

    console.log(response);
    if(response.status === 201){
      const tipoUsuario = response.data.user.tipo_usuario;
      setUser(response.data.user);
      
      if(tipoUsuario === 1){
        message.success(t("messageSuccess.loginSuccess"))
        navigate('/admin');
      }

      if(tipoUsuario === 2){
        const idClient = response.data.user.id_cliente;
        const res = await axios.get(`http://localhost:3000/api/client/sample/${idClient}`, {
          headers: {
            Authorization: `Bearer ${response.data.token}`
          }
        });
        if(res.status === 200){
          message.success(t("messageSuccess.loginSuccess"))
          setClient(res.data[0]);
          localStorage.setItem('clientData', JSON.stringify(res.data[0]));
          navigate('/home');
        }
      }

      if(tipoUsuario === 3){
        message.success(t("messageSuccess.loginSuccess"))
        navigate('/worker');
      }

      if(!tipoUsuario)
        message.info(t("messageError.notExistUser"));
    }

  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if(password && user_name && email){
      const client = {
        user_name,
        password,
        email
      }

      const response = await axios.post('http://localhost:3000/api/auth/register', client);

      if(response.status === 201)
        navigate('/home');
    }
  }
  return (
    <div className={`container ${visible ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)}/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button onClick={(e) => handleLogin(e)} value="Login" className="btn solid">Login</button>
          </form>
          <form className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)}/>
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button onClick={(e) => handleRegister(e)} className="btn" value="Sign up">Sign up</button>
            <p className="social-text">Or Sign up with social platforms</p>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content-login">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button onClick={handleLogger} className="btn transparent" id="sign-up-btn">
              Sign up
            </button>
          </div>
        </div>
        <div className="panel right-panel">
          <div className="content-login">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button onClick={handleLogger} className="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register