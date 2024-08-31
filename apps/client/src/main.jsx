import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; 
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import Loguin from "./component/Loguin.jsx";
import UserAdmin from "./pages/UserPages/UserAdmin.jsx";

/*Crear proyecton*/ 

// const router = new createBrowserRouter([
//   {
//     path: "/",
//     element: <Loguin/>,
//     children: [
//      {
//       path: "admin",
//       element: <UserAdmin/>
//      },
//     ],
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
