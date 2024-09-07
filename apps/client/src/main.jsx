import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; 
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import Loguin from "./component/Loguin.jsx";
import UserAdmin from "./pages/UserPages/UserAdmin.jsx";
import i18next from 'i18next';
import global_es from "./translations/es/global.json"
import global_en from "./translations/en/global.json"
import { I18nextProvider } from "react-i18next";

/*Crear proyecton*/
i18next.init({
  interpolation: { escapeValue: false },
  lng: "es",
  resources: {
    es: {
      global: global_es,
    },
    en: {
      global: global_en,
    }
  }
});

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
    <I18nextProvider i18n={i18next} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);
