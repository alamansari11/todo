import express from "express";
import { User } from "../models/user.js";
import { getAllUsers, register, login,getUserDetails } from "../controllers/user.js";
const router = express.Router();


router.post("/new", register);
// router.get("/all", getAllUsers);
router.post("/login", login);
// router.route("/userid/:id").get(getUserDetails);

export default router;
