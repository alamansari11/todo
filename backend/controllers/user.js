import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";

export const getAllUsers = async (req, res) => {};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }).select("+password");
  console.log(user);
  if (!user)
    return res.status(404).json({
      success: false,
      message: "Invalid Email or password",
    });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(404).json({
      success: false,
      message: "Invalid Email or password",
    });
  }
  sendCookie(user, res, `Welcome Back ${user.name}`, 200);
};

export const register = async (req, res) => {
  console.log("entered register");
  const { name, email, password } = req.body;
  console.log(name, email, password);
  let user = await User.findOne({ email });
  if (user)
    return res.status(404).json({
      success: false,
      message: "User already registered",
    });
  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({ name, email, password: hashedPassword });

  sendCookie(user, res, "Registered Successfully", 201);
};

export const getUserDetails = async (req, res) => {};
