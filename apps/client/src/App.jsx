import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserAdmin from "./pages/UserPages/UserAdmin";
import Loguin from "./component/Loguin";
import ListMoto from "./pages/motos/ListMoto";
import { Avatar, Checkbox, DatePicker, Dropdown, Flex, FloatButton, Input, InputNumber, List, message, Modal, Select, Skeleton, Tag, Watermark } from "antd";
import { useState } from "react";
import FormItemLabel from "antd/es/form/FormItemLabel";
import Item from "antd/es/list/Item";
import ModalMoto from "./components/ModalMoto";
import ModalContract from "./components/ModalContract";
import ModalClient from "./components/ModalClient";



{/* <Route path="/" element={<Loguin/>}/>
      <Route path="/admin" element={<UserAdmin/>}>
        <Route path="listadoClientes" element={<ListadoClientes/>}/>
      </Route>
      <Route path="/client" element={<UserClient/>}/> */}

function App() {
  const [visible, setVisible] = useState(false)

  const handleVisibility = () => {
    setVisible(!visible);
  }
  return (
    <>
      <UserAdmin/>
    </>
  );
}

export default App;
