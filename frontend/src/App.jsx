import './App.css'
import {BrowserRouter ,Route, Routes} from "react-router-dom";
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Header from './components/Header';
import MainSection from './components/MainSection';
import {Toaster} from "react-hot-toast";
import { useContext } from 'react';
import { context } from './main';
import { useEffect } from 'react';
import axios from 'axios';
import { server } from './main';


function App() {
  const {setUser,setIsAuthenticated} = useContext(context);
  useEffect(() => {
    axios.get(`${server}/users/me`, {
      withCredentials: true,
    })
    .then(response => {
      setUser(response.data.user);
      setIsAuthenticated(true);
    })
    .catch(error => {
      // Handle errors more explicitly
      if (error.response && error.response.data && error.response.data.message) {
        console.error("Error message:", error.response.data.message);
      }
  
      // Set user to an empty object and update authentication state
      setUser({});
      setIsAuthenticated(false);
    });
  }, [setUser,setIsAuthenticated]);
  
  return (
    <BrowserRouter>
    <Header />
    <MainSection />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App
