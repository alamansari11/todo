// Importing the 'express' library to create a router
import express from "express";

// Importing the 'User' model from the '../models/user.js' file
import { User } from "../models/user.js";

// Importing user-related controller functions
import {
    register,
    login,
    getMyProfile,
    logout
} from "../controllers/user.js";

// Importing middleware to check if the user is authenticated
import { isAuthenticated } from "../middlewares/auth.js";

// Creating a new router instance using express.Router()
const router = express.Router();

// Endpoint for user registration (POST request to '/new')
router.post("/new", register);

// Endpoint for user login (POST request to '/login')
router.post("/login", login);

// Endpoint for user logout (GET request to '/logout')
router.get("/logout", logout);

// Endpoint to get the profile of the authenticated user (GET request to '/me')
// Using the 'isAuthenticated' middleware to ensure the user is logged in
router.get("/me", isAuthenticated, getMyProfile);

// Exporting the router for use in other parts of the application
export default router;
