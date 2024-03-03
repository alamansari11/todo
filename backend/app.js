import express from "express";
import userRouter from "./routes/user.js";
import { config } from "dotenv";



export const app = express();

config({
  path:"./data/config.env",
 });


//using middleware to use json data
app.use(express.json()); // this should always be used first

app.use("/api/v1/users",userRouter);

app.get("/", (req, res) => {
    return res.send("hello")
})
