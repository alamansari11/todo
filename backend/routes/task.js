import express from "express";
import { User } from "../models/user.js";
import { newTask, allTask, updateTask,deleteTask} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();


router.post("/newTask",isAuthenticated, newTask);
router.get("/all",isAuthenticated, allTask);

router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);


export default router;
