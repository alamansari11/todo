import './App.css'
import {BrowserRouter ,Route, Routes} from "react-router-dom";
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Header from './components/Header';
import MainSection from './components/MainSection';
import {Toaster} from "react-hot-toast";


function App() {
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
