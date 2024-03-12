// Importing necessary modules and files
import ErrorHandler from "../middlewares/error.js"; // Middleware for handling errors
import { User } from "../models/user.js"; // User model for database operations
import { sendCookie } from "../utils/features.js"; // Utility function for sending cookies
import { hashPassword, comparePasswords } from "../utils/features.js"; // Utility functions for password handling

// Controller function for user login
export const login = async (req, res, next) => {
  try {
    // Destructuring email and password from the request body
    const { email, password } = req.body;

    // Finding a user in the database by their email and selecting the password
    const user = await User.findOne({ email: email }).select("+password");

    // Handling case where user is not found
    if (!user) return next(new ErrorHandler("Invalid Email or password", 400));

    // Comparing the provided password with the stored password
    const isMatch = await comparePasswords(password, user.password);

    // Handling case where passwords don't match
    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "Invalid Email or password",
      });
    }

    // Sending a welcome back message and setting user's cookie
    sendCookie(user, res, `Welcome Back ${user.name}`, 200);
  } catch (error) {
    // Handling any unexpected errors
    next(error);
  }
};

// Controller function for user logout
export const logout = async (req, res, next) => {
  try {
    // Clearing the token cookie and sending a logout success message
    res
      .status(200)
      .cookie("token", "", { expires: new Date(0), path: "/",httpOnly: true })
      .json({
        success: true,
        message: "Logout successful",
        sameSite: process.env.NODE_ENV === "dev" ? "lax" : "none", // Setting 'SameSite' attribute for cookie
        secure: process.env.NODE_ENV === "dev" ? false : true, // Setting 'Secure' attribute for cookie
      });
  } catch (error) {
    // Handling any unexpected errors
    next(error);
  }
};

// Controller function for user registration
export const register = async (req, res, next) => {
  try {
    // Destructuring name, email, and password from the request body
    const { name, email, password } = req.body;

    // Checking if the user with the provided email already exists
    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User already registered", 400));

    // Hashing the provided password and creating a new user in the database
    const hashedPassword = await hashPassword(password);
    user = await User.create({ name, email, password: hashedPassword });

    // Sending a registration success message and setting user's cookie
    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    // Handling any unexpected errors
    next(error);
  }
};

// Controller function to get the profile of the authenticated user
export const getMyProfile = (req, res, next) => {
  try {
    // Sending a JSON response with the authenticated user's information
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    // Handling any unexpected errors
    next(error);
  }
};
