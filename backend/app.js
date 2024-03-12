import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js"; // Corrected typo: 'error' to 'error'
import cors from "cors";

// Creating an instance of the Express application
export const app = express();

// Configuring environment variables from the 'config.env' file in the 'data' folder
config({
  path: "./data/config.env",
});

// Using middleware to parse incoming JSON data
app.use(express.json()); // This should always be used first

// Using cookieParser middleware to handle cookies
// Note: Always call it using () otherwise it won't work
app.use(cookieParser());

// Configuring CORS middleware to allow requests from the specified origin
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
})); // This should always be used first

// Routing for user and task endpoints
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

// Default route for testing server status
app.get("/", (req, res) => {
  return res.send("Hello, Server is up and running");
});

// Using error middleware to handle and log errors
app.use(errorMiddleware);