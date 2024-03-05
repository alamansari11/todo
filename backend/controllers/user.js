import ErrorHandler from "../middlewares/errror.js";
import { User } from "../models/user.js";
import { sendCookie } from "../utils/features.js";
import { hashPassword, comparePasswords } from "../utils/features.js";


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
  const user = await User.findOne({ email: email }).select("+password");
  console.log(user);

  if (!user) return next(new ErrorHandler("Invalid Email or password",400));
  const isMatch = await comparePasswords(password,user.password);
  if (!isMatch) {
    return res.status(404).json({
      success: false,
      message: "Invalid Email or password",
    });
  }
  sendCookie(user, res, `Welcome Back ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
 try {
  res.status(200).cookie("token","",{expires: new Date(Date.now())}).json({
    success: true,
    message: "Logout successfull",
  });
 } catch (error) {
  next(error);
 }
  };





export const register = async (req, res) => {
 try {
  console.log("entered register");
  const { name, email, password } = req.body;
  console.log(name, email, password);
  let user = await User.findOne({ email });
  if (user) return next(new ErrorHandler("User already registered",400));
  const hashedPassword = await hashPassword(password);
  user = await User.create({ name, email, password: hashedPassword });

  sendCookie(user, res, "Registered Successfully", 201);
 } catch (error) {
  next(error);
 }
};



export const getMyProfile = (req, res) => {
try {
  
  res.status(200).json({
    success: true,
    user:req.user,
  });
} catch (error) {
  next(error);
}
};
