// Importing necessary React components and styles
import React, { useState, createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";

// Defining the URL for the server API
export const server = "https://todo-flq7.onrender.com";
// export const server = "http://localhost:3000";

// Creating a React context to manage global state
export const context = createContext({ isAuthenticated: false });

// Wrapping the main 'App' component with additional state and context providers
const AppWrapper = () => {
  // State variables for managing authentication status, loading state, and user data
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  // Providing the state values through the context provider
  return (
    <context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        user,
        setUser,
      }}
    >
      {/* Rendering the main 'App' component */}
      <App />
    </context.Provider>
  );
};

// Rendering the 'AppWrapper' component inside a React root
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
