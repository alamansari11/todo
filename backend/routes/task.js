// Importing the 'express' library to create a router
import express from "express";

// Importing the 'User' model from the '../models/user.js' file
import { User } from "../models/user.js";

// Importing task-related controller functions
import { newTask, allTask, updateTask, deleteTask } from "../controllers/task.js";

// Importing middleware to check if the user is authenticated
import { isAuthenticated } from "../middlewares/auth.js";

// Creating a new router instance using express.Router()
const router = express.Router();

// Endpoint for creating a new task (POST request to '/newTask')
// Using the 'isAuthenticated' middleware to ensure the user is logged in
router.post("/newTask", isAuthenticated, newTask);

// Endpoint to get all tasks (GET request to '/all')
// Using the 'isAuthenticated' middleware to ensure the user is logged in
router.get("/all", isAuthenticated, allTask);

// Endpoint to update and delete a task by ID (PUT and DELETE requests to '/:id')
// Using the 'isAuthenticated' middleware to ensure the user is logged in
router.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask);

// Exporting the router for use in other parts of the application
export default router;
