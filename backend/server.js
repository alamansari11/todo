// Importing the 'app' instance from the 'app.js' module
import { app } from "./app.js";

// Importing the 'connectDB' function from the 'database.js' module in the 'data' folder
import { connectDB } from "./data/database.js";

// Calling the 'connectDB' function to establish a connection to the database
connectDB();

// Starting the server and listening on the specified port from the environment variables
app.listen(process.env.PORT, () => {
    // Logging a message indicating the server is running, along with the port and environment mode
    console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} Mode`);
});