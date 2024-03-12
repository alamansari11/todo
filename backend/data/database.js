// Importing the 'mongoose' library for connecting to MongoDB
import mongoose from "mongoose";

// Function to connect to the MongoDB database
export const connectDB = () => {
    // Using 'mongoose.connect()' to establish a connection with the MongoDB server
    mongoose
        .connect(process.env.MONGODB_URL) // Connecting to the MongoDB database using the URL from environment variables
        .then(() => {
            console.log("Connected to MongoDB"); // Logging a success message if the connection is established
        })
        .catch((err) => {
            console.log(err); // Logging an error message if there's an issue connecting to the database
        });
};
