import React from "react";
import { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import SideBar from "./components/SideBar.jsx";
import Content from "./components/Content.jsx";
import { Space } from "antd";

function App() {

  return (
      <div className="App">
        <Header />
        <Space className="container-sideBar-content">
          <SideBar></SideBar>
          <Content></Content>
        </Space>
      </div>
  );
}

export default App;
