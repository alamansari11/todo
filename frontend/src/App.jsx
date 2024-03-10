import { Profile, Home, Login, Register } from "./pages";

import Header from "./components/Header/Header";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useContext } from "react";
import { server, context } from "./main";

import axios from "axios";
import "./App.css";

function App() {
  const { setUser, setIsAuthenticated, setLoading } = useContext(context);
  useEffect(() => {
    // console.log("runs effect")
    setLoading(true);
    axios
      .get(`${server}/api/v1/users/me`, {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        // Handle errors more explicitly
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          console.error("Error message:", error.response.data.message);
        }

        // Set user to an empty object and update authentication state
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
