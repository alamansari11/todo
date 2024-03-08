import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/app.scss";
import { createContext } from "react";

export const server = "https://todo-flq7.onrender.com";
const context = createContext({ isAuthenticated: false });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <context.Provider>
      <App />
    </context.Provider>
  </React.StrictMode>
);
