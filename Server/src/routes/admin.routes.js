import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { checkAdmin } from "../middleware/admin.middleware.js";
import Order from "../models/order.model.js";
import {
  deleteProduct,
  getProducts,
  updateProduct,
  uploadProducts,
} from "../controllers/adminController.js";
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
adminRoutes.delete("/delete/:id", deleteProduct);
adminRoutes.patch("/update/:id", updateProduct);
adminRoutes.get(
  "/seeProductPlaced",

  async (req, res) => {
    try {
      const orders = await Order.find()
        .populate("userId", "username email")
        .populate("items.productId", "name price");
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Server error fetching orders." });
    }
  }
);
export default adminRoutes;
