// Importing the 'User' model from the '../models/user.js' file
import { User } from "../models/user.js";

// Importing the 'jsonwebtoken' library for handling JSON Web Tokens (JWT)
import jwt from "jsonwebtoken";

// Middleware function to check if the user is authenticated
export const isAuthenticated = async (req, res, next) => {

  // Extracting the 'token' from the cookies of the incoming request
  const { token } = req.cookies;

  // Checking if the 'token' is missing
  if (!token) {
    // Returning a JSON response with a 404 status and a message indicating the user needs to log in
    return res.status(404).json({
      success: false,
      message: "Login First",
    });
  }

  // Verifying the 'token' using the secret key from the environment variables
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Fetching the user information from the database based on the decoded token
  req.user = await User.findById(decoded._id);

  // Moving on to the next middleware or route handler
  next();
};
