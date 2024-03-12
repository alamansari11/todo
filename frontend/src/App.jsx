// Importing necessary React components and styles
import { Profile, Home, Login, Register } from "./pages";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useContext } from "react";
import { server, context } from "./main";
import axios from "axios";
import "./App.css";

// Main functional component representing the entire application
function App() {
  // Destructuring context values for global state management
  const { setUser, setIsAuthenticated, setLoading } = useContext(context);

  // useEffect hook to fetch user data on component mount
  useEffect(() => {
    // Setting loading state to true while fetching data
    setLoading(true);

    // Making a GET request to fetch user data from the server
    axios
      .get(`${server}/api/v1/users/me`, {
        withCredentials: true,
      })
      .then((response) => {
        // Updating user data, authentication status, and setting loading state to false
        setUser(response.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        // Handling errors more explicitly
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          console.error("Error message:", error.response.data.message);
        }

        // Setting user data to an empty object and updating authentication status on error
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  // Rendering the main structure of the application using React Router
  return (
    <BrowserRouter>
      {/* Including the Header component for navigation */}
      <Header />

      {/* Setting up routes for different pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {/* Adding a notification Toaster for displaying messages */}
      <Toaster />
    </BrowserRouter>
  );
}

// Exporting the App component as the default export of this module
export default App;
