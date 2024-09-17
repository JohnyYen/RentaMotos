import{ Button}from "antd";
import {CarOutlined } from '@ant-design/icons';
import { useTranslation } from "react-i18next";
import './App.css';
import Operation from "antd/es/transfer/operation";
import axios from 'axios';


const NuevaMoto = ({isVisible, setVisible}) => {

  const [matricula, setMatricula] = useState("");
  const [Color, setColor] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  
  // Translation
  const [t] = useTranslation("global");

  if(!isVisible) return null;

  const handlePetition = (moto) => {
    console.log(moto);
  }
  
  const Modal =(isOpen, closeModal) =>{
    if(!isOpen) return null;
    
      return(
        <div className="pantallamoto">
        
        <div style={{ 
                position: 'fixed', 
                top: '20px', 
                left: '50%', 
                transform: 'translateX(-50%)', 
              }} >
              <  CarOutlined  className= "Creamoto"/>
              </div>
        
        <div className="panelCentral">
        
        <Form  >
          <Form.Item  label={<span style={{ color: 'white' }}>{t("mainContent.table.serialNumber")}:</span>} name={"matriculamoto"} >
              <Input placeholder={t("mainContent.table.serialNumber")}/>
          </Form.Item>
        
        
          <Form.Item label={<span style={{ color: 'white' }}>Color:</span>} name={"colormoto"}>
        <Select  >
          <Operation value ="1">{t("mainContent.table.colors.red")}</Operation>
          <Operation value ="2">{t("mainContent.table.colors.black")}</Operation>
          <Operation value ="3">{t("mainContent.table.colors.blue")}</Operation>
          <Operation value ="4">{t("mainContent.table.colors.green")}</Operation>
          <Operation value ="5">{t("mainContent.table.colors.yellow")}</Operation>
          <Operation value ="6">{t("mainContent.table.colors.grey")}</Operation>
          <Operation value ="7">{t("mainContent.table.colors.orange")}</Operation>
          <Operation value ="8">{t("mainContent.table.colors.purple")}</Operation>
          <Operation value ="9">{t("mainContent.table.colors.neon")}</Operation>
          <Operation value ="10">{t("mainContent.table.colors.silver")}</Operation>
          <Operation value ="11">{t("mainContent.table.colors.gold")}</Operation>
        </Select>
        </Form.Item>
        
        
        
          <Form.Item label={<span style={{ color: 'white' }}>{t("mainContent.table.mark")}:</span>} name={"marcaMoto"}>
              <Input placeholder={t("mainContent.table.mark")}/>
          </Form.Item>
        
        
          <Form.Item label={<span style={{ color: 'white' }}>{t("mainContent.table.model")}:</span>} name={"moodelomoto"}>
              <Input placeholder={t("mainContent.table.Model")}/>
          </Form.Item>
        
        
          <Form.Item label={<span style={{ color: 'white' }}>{t("mainContent.table.situation")}:</span>} name={"situaciónmoto"}>
        <Select  >
          <Operation value ="1">{t("mainContent.table.situations.workshop")}</Operation>
          <Operation value ="2">{t("mainContent.table.situations.available")}</Operation>
          <Operation value ="3">{t("mainContent.table.situations.rented")}</Operation>
         
        </Select>
        </Form.Item>
        
        
        
        
        </Form>
        
        </div>
        
              <div className="panelBotonesmoto">
        <Button className="Bm1" type="primary" size="large" block >{t("login.cancel")}
                </Button>
        
                <Button className="Bm2" type="primary"  size="large" block>
                {t("mainContent.table.situations.accept")}
                </Button>
        </div>
        
        </div>)}



  return (
<div className="pantallamoto">

<div style={{ 
        position: 'fixed', 
        top: '20px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
      }} >
      <  CarOutlined  className= "Creamoto"/>
      </div>

<div className="panelCentral">

  <form className="formMoto">
    <label htmlFor="matricula">Matricula</label>
    <input onChange={(e) => setMatricula(e.target.value)} placeholder="Ingrese su matricula" id="matricula" name="matricula"/>

    <label htmlFor="color">Color</label>
    <select onChange={(e) => setColor(e.target.value)} name="color" id="color">
      <option value ="1"  >rojo</option>
      <option value ="2">negro</option>
      <option value ="3">azul</option>
      <option value ="4">verde</option>
      <option value ="5">amarillo</option>
      <option value ="6">gris</option>
      <option value ="7">naranja</option>
      <option value ="8">morado</option>
      <option value ="9">neón</option>
      <option value ="10">plateado</option>
      <option value ="11">dorado</option>
    </select>

    <label htmlFor="marca">Marca</label>
    <select onChange={(e) => setMarca(e.target.value)} id="marca" name="marca">

    </select>

    <label htmlFor="modelo">Modelo</label>
    <select onChange={(e) => setModelo(e.target.value)} id="modelo" name="modelo">

    </select>
  </form>
</div>

      <div className="panelBotonesmoto">
        <Button onClick={setVisible} className="Bm1" type="primary" size="large" block >Cancelar
        </Button>

          <Button onClick={() => handlePetition({matricula: matricula, color:Color, cantKm: 0, marca : marca, modelo : modelo, situacion: "Disponible"})} className="Bm2" type="primary"  size="large" block>
            Aceptar
          </Button>
      </div>

</div>
    
  );};



  export default  NuevaMoto ;
