import express from "express";
import {
  editUser,
  loginUser,
  logout,
  registerUser,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/logout", logout);
userRoutes.post("/edit", authMiddleware, editUser);

export default userRoutes;
