import React from "react";
import ReactDOM from "react-dom/client";
import MainLayoutPage from "./MainLayout";
import { ThemeProvider } from "./context/ThemeContext";


import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
         <MainLayoutPage />
   
    </ThemeProvider>
  </React.StrictMode>
);
