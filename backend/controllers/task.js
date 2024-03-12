// Importing the 'ErrorHandler' class for handling errors
import ErrorHandler from "../middlewares/error.js";

// Importing the 'Task' model for working with tasks
import Task from "../models/task.js";

// Controller function for creating a new task
export const newTask = async (req, res, next) => {
    try {
        // Extracting title and description from the request body
        const { title, description } = req.body;

        // Creating a new task using the 'Task' model
        await Task.create({
            title,
            description,
            user: req.user, // Associating the task with the logged-in user
        });

        // Sending a JSON response indicating success and a message
        res.status(201).json({
            success: true,
            message: "Task Created Successfully",
        });
    } catch (error) {
        // Passing the error to the next middleware
        next(error);
    }
};

// Controller function for fetching all tasks of the logged-in user
export const allTask = async (req, res, next) => {
    try {

        // Extracting the user ID from the logged-in user's information
        const user_id = req.user._id;

        // Finding all tasks associated with the user using the 'Task' model
        const tasks = await Task.find({ user: user_id });

        // Sending a JSON response with success status and the tasks
        res.status(201).json({
            success: true,
            tasks: tasks,
        });
    } catch (error) {
        // Passing the error to the next middleware
        next(error);
    }
};

// Controller function for updating the completion status of a task
export const updateTask = async (req, res, next) => {
    try {
        // Extracting the task ID from the request parameters
        const { id } = req.params;

        // Finding the task by ID using the 'Task' model
        const task = await Task.findById(id);

        // Handling the case where the task is not found
        if (!task) return next(new ErrorHandler("Task not found", 404));

        // Toggling the 'isCompleted' status of the task
        task.isCompleted = !task.isCompleted;

        // Saving the updated task
        await task.save();

        // Sending a JSON response indicating success and a message
        res.status(204).json({
            success: true,
            message: "Task updated",
        });
    } catch (error) {
        // Passing the error to the next middleware
        next(error);
    }
};

// Controller function for deleting a task
export const deleteTask = async (req, res, next) => {
    try {
        // Extracting the task ID from the request parameters
        const { id } = req.params;

        // Finding the task by ID using the 'Task' model
        const task = await Task.findById(id);

        // Handling the case where the task is not found
        if (!task) return next(new ErrorHandler("Task not found", 404));

        // Deleting the task
        await task.deleteOne();

        // Sending a JSON response indicating success and a message
        res.status(204).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        // Passing the error to the next middleware
        next(error);
    }
};
