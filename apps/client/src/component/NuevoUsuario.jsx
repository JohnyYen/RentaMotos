import{ Button}from "antd";
import {UserOutlined} from '@ant-design/icons';
import axios from 'axios';
import { useState } from "react";
import { useTranslation } from "react-i18next";

const NuevoCliente = ({visible, setVisible}) => {

  //User
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [ci, setCi] = useState("");

  //Client
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [sex, setSex] = useState("");
  const [mun, setMun] = useState("");
  const [numCont, setNumCont] = useState("");

  //Municipios
  const [munList, setMunList] = useState([]);

  //Translation
  const [t] = useTranslation("global");

  axios.get("http://localhost:3000/api/mun").then((res) => setMunList(res.data)).catch((error) => console.log(error));

  if (!visible) return null;

  const handlePetition = async (userInfo, client) => {
    console.log(client);
    console.log(await axios.post('http://localhost:3000/api/user/client', userInfo));
    
  }
  return (
  
  <div className="pantalla">
 
  <div style={{ 
          position: 'fixed', 
          top: '20px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
        }} >
        <UserOutlined className= "CreaUsuario"/>
  </div>
  
  
  <div className="panelImputIzquierdo">
  <form>
    <div id="left-div">
    <label htmlFor="userName">{t("profile.username")}</label>
      <input onChange={(e) => setUser(e.target.value)} type="text" placeholder={t("profile.username")} id="userName" name="userName"/>
    
      <label htmlFor="email">{t("profile.email")}</label>
      <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder={t("profile.email")} name="email" id="email"/>

      <label>{t("profile.name")}</label>
      <input onChange={(e) => setName(e.target.value)} placeholder={t("profile.name")}/>

      <label>{t("profile.lastName")}</label>
      <input onChange={(e) => setLastName(e.target.value)} placeholder={t("profile.lastName")}/>

      <label>CI</label>
      <input onChange={(e) => setCi(e.target.value)} placeholder="CI"/>
    </div>

    <div id="rigth-div">
    <label>{t("profile.contactNumber")}</label>
      <input onChange={(e) => setNumCont(e.target.value)} placeholder={t("profile.contactNumber")}/>

      <label>{t("profile.passord")}</label>
      <input onChange={(e) => setPassword(e.target.value)} placeholder={t("profile.password")}/>


      <label>{t("profile.sex")}</label>
      <select onChange={(e) => setSex(e.target.value)}>
        <option>F</option>
        <option>M</option>
      </select>

      <label>{t("profile.municipality")}</label>
      <select onChange={(e) => setMun(e.target.value)}>
        {munList.map((item, i) => (
          <option key={i}>{item}</option>
        ))}
      </select>

      <label>{t("profile.age")}</label>
      <input onChange={(e) => setAge(e.target.value)} type="number"  min={16} max={70} placeholder={t("profile.age")}/>
    </div>
  </form>
  </div>

  <div className="panelBotones">
          <Button onClick={setVisible} className="B1" type="primary" size="large" block >{t("login.cancel")}
          </Button>
  
          <Button
           onClick={() => handlePetition({user_name:user, password:password, email:email, id: ci}, 
            {idCliente:ci, nombre:name, segNombre:name, primApellido:lastName, segApellido: lastName, edad:age, municipio:mun, sexo:sex, numcont:numCont}
           )}
            className="B2" type="primary"  size="large" block>
            {t("login.accept")}
          </Button>
  </div>
  
 
  </div>

    );};
  
    export default  NuevoCliente ;
  
