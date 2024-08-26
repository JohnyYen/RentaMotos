import React from "react";
import { useState } from "react";
import "./App.css";
import AppRoutes from "./components/AppRoutes";
import { Switch } from "antd";
import UserAdmin from "./pages/UserPages/UserAdmin";



function App() {

  return (
      <UserAdmin></UserAdmin>
    );
}

export default App;
