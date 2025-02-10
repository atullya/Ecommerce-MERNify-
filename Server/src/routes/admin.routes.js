import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { checkAdmin } from "../middleware/admin.middleware.js";
import { getProducts, uploadProducts } from "../controllers/adminController.js";
import uploadMiddleware from "../middleware/uploadmiddleware.js";

const adminRoutes = express.Router();

adminRoutes.get("/welcome", authMiddleware, checkAdmin, (req, res) => {
  res.send("Hello");
});

// Update route to allow multiple images (max 5)
adminRoutes.post(
  "/upload",
  authMiddleware,
  checkAdmin,
  uploadMiddleware.array("images", 5), // Accept multiple images (max 5)
  uploadProducts
);
adminRoutes.get("/products", getProducts);

export default adminRoutes;
