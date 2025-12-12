import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import MainLayoutPage from './MainLayout.tsx'
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <MainLayoutPage>
        <App />
      </MainLayoutPage>
    </ThemeProvider>
  </React.StrictMode>
);

