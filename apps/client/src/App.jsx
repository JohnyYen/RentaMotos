import React from "react";
import { useState } from "react";
import "./App.css";
import AppRoutes from "./components/AppRoutes";
import UserAdmin from "./pages/UserPages/UserAdmin";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Loguin from "./component/Loguin";
import UserClient from "./pages/UserPages/UserClient";


function App() {

  return (
    <UserAdmin />
    );
}

export default App;
