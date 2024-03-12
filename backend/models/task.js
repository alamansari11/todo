// Importing the 'mongoose' library for working with MongoDB
import mongoose from "mongoose";

// Creating a schema for the 'Task' model
const schema = new mongoose.Schema({
    // Defining the 'title' field with type String, which is required
    title: {
        type: String,
        required: true,
    },
    // Defining the 'description' field with type String, which is required
    description: {
        type: String,
        required: true,
    },
    // Defining the 'isCompleted' field with type Boolean, defaulting to false
    isCompleted: {
        type: Boolean,
        default: false,
    },
    // Defining the 'user' field with type ObjectId, referencing the 'User' model, and required
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Referring to the 'User' model
        required: true,
    },
    // Defining the 'createdAt' field with type Date, set to the current date by default
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Creating the 'Task' model using the schema
const Task = mongoose.model("Task", schema);

// Exporting the 'Task' model for use in other parts of the application
export default Task;
