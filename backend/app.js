import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errror.js";



export const app = express();

config({
  path:"./data/config.env",
 });

//using middleware to use json data
app.use(express.json()); // this should always be used first
app.use(cookieParser()) // always call it using () other wise it won't work

app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);

app.get("/", (req, res) => {
    return res.send("hello")
})

//using error middleware
app.use(errorMiddleware);