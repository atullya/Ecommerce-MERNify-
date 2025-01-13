import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { checkAdmin } from "../middleware/admin.middleware.js";
import { uploadProducts } from "../controllers/adminController.js";
import uploadMiddleware from "../middleware/uploadmiddleware.js";

const adminRoutes = express.Router();

adminRoutes.get("/welcome", authMiddleware, checkAdmin, (req, res) => {
  res.send("Hello");
});
adminRoutes.post(
  "/upload",
  authMiddleware,
  checkAdmin,
  uploadMiddleware.single("image"),
  uploadProducts
);

export default adminRoutes;
