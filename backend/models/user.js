// Importing the 'mongoose' library for working with MongoDB
import mongoose from "mongoose";

// Creating a schema for the 'User' model
const schema = new mongoose.Schema({
    // Defining the 'name' field with type String, which is required
    name: {
        type: String,
        required: true,
    },
    // Defining the 'email' field with type String, which is required and unique
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // Defining the 'password' field with type String, required, and set as not selectable by default
    password: {
        type: String,
        required: true,
        select: false, // By default, this password will not be accessible using findOne(), etc.
    },
    // Defining the 'createdAt' field with type Date, set to the current date by default
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Creating the 'User' model using the schema
export const User = mongoose.model("User", schema);
