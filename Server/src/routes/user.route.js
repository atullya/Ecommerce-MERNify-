import express from "express";
import { loginUser, logout, registerUser } from "../controllers/authController.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post('/login',loginUser)
userRoutes.get('/logout',logout)

export default userRoutes;
