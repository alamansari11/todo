import ErrorHandler from "../middlewares/errror.js";
import Task from "../models/task.js"

export const newTask = async (req,res,next)=>{
    try {
        console.log("entered newTask");
 const {title,description} = req.body;
console.log(1)
 await Task.create({
    title,
    description,
    user: req.user,
 })
 console.log(2)
 res.status(201).json({
    success: true,
    message: "Task Created Successfully",
 });
    } catch (error) {
        next(error);
    }
};

export const allTask = async (req,res,next)=>{
    try {
        console.log("entered all Task");
 const user_id = req.user._id;
 const tasks = await Task.find({user: user_id});
 console.log(2)
 res.status(201).json({
    success: true,
    tasks: tasks,
 });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req,res,next)=>{
    try {
        console.log("entered update");
const {id} = req.params;

 const task = await Task.findById(id);
 if(!task) return next(new ErrorHandler("Task not found",404));

 task.isCompleted = !task.isCompleted;
 await task.save();

 console.log(2)
 res.status(204).json({
    success: true,
    message: "Task updated",
 });
    } catch (error) {
        next(error);
    }
};
export const deleteTask = async (req,res,next)=>{
    try {
        console.log("entered  delete");
    const {id} = req.params;

    const task = await Task.findById(id);
    if(!task) return next(new ErrorHandler());
    await task.deleteOne();

 res.status(204).json({
    success: true,
    "message": "task deleted successfully",
 });
    } catch (error) {
        next(error);
    }
};