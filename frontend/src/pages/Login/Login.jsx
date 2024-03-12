// Importing necessary React components, styles, and dependencies
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { server } from "../../main";
import toast from "react-hot-toast";
import { context } from "../../main";
import { Navigate } from "react-router-dom";

// Importing CSS styles specific to the Login component
import "./Login.css";

// Functional component representing the login page
function Login() {
  // State variables to manage user input and authentication status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Destructuring context values for global state management
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(context);

  // Event handler for submitting the login form
  const submitHandler = async (e) => {
    // Setting loading state to true during form submission
    setLoading(true);
    e.preventDefault();

    try {
      // Making a POST request to the server to authenticate the user
      const { data } = await axios.post(
        `${server}/api/v1/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Displaying a success toast message and updating authentication status
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      // Displaying an error toast message on login failure
      toast.error(error.response.data.message);

      // Updating authentication status and setting loading state to false
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  // Redirecting to the home page if the user is already authenticated
  if (isAuthenticated) return <Navigate to="/" />;

  // Rendering the login form and registration link
  return (
    <div className="login">
      {/* Form for user login with a tagline */}
      <form onSubmit={submitHandler} className="login__form">
        <div className="login__tagline">
          <h3>Unlock Your Productivity: </h3>
          Log in to Your Todo Universe and Make Every Task Count!
        </div>

        {/* Input fields for email and password */}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Password"
          required
        />

        {/* Button for submitting the login form */}
        <button type="submit" disabled={loading}>
          Login
        </button>

        {/* OR separator and link to the registration page */}
        <h4>OR</h4>
        <Link to="/register" className="login__option">
          Signup
        </Link>
      </form>
    </div>
  );
}

// Exporting the Login component as the default export of this module
export default Login;
