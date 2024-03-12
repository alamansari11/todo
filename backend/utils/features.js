import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const sendCookie = (user, res, message, statusCode = 200) =>{
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

  res
  .status(statusCode)
  .cookie("token",token,{
    httpOnly: true,
    maxAge: 15*60*1000,
    sameSite: process.env.NODE_EVN === "dev" ? "lax": "none",
    secure:process.env.NODE_EVN === "dev" ? false: true,
  })
  .json({
    success: true,
    message,
  })
}

// Function to hash (encrypt) a password
async function hashPassword(password) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
}

// Function to compare (decrypt) a password with its hash
async function comparePasswords(password, hashedPassword) {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
}

export {hashPassword,comparePasswords}; 