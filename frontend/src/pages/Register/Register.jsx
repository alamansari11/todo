// Importing necessary React components and styles
import { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { server } from "../../main";
import toast from "react-hot-toast";
import { context } from "../../main";
import { Navigate } from "react-router-dom";

// Importing CSS styles specific to the Register component
import "./Register.css";

// Functional component representing the registration page
function Register() {
  // State variables to manage user input and authentication status
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Destructuring context values for global state management
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(context);

  // Event handler for submitting the registration form
  const submitHandler = async (e) => {
    // Setting loading state to true during form submission
    setLoading(true);
    e.preventDefault();

    try {
      // Making a POST request to the server to create a new user
      const { data } = await axios.post(
        `${server}/api/v1/users/new`,
        {
          name,
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
      // Displaying an error toast message on registration failure
      toast.error(error.response.data.message);

      // Updating authentication status and setting loading state to false
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  // Redirecting to the home page if the user is already authenticated
  if (isAuthenticated) return <Navigate to="/" />;

  // Rendering the registration form and login link
  return (
    <div className="register">
      <section>
        <form onSubmit={submitHandler}>
          {/* Input fields for name, email, and password */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            placeholder="Name"
            required
          />
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

          {/* Button for submitting the registration form */}
          <button disabled={loading} type="submit">
            Sign up
          </button>

          {/* OR separator and link to the login page */}
          <h4>OR</h4>
          <Link to="/login" className="loginbtn">
            Login
          </Link>
        </form>
      </section>
    </div>
  );
}

// Exporting the Register component as the default export of this module
export default Register;
