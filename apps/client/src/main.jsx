import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; 
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import i18next from 'i18next';
import global_es from "./assets/translations/es/global.json"
import global_en from "./assets/translations/en/global.json"
import { I18nextProvider } from "react-i18next";

/*Crear proyecton*/
localStorage.setItem('login','false')
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
