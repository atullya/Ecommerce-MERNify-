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
import CancelledOrder from "../models/cancelledOrder.js";
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
// Update order status route using _id
adminRoutes.patch(
  "/update-order-status/:_id",

  async (req, res) => {
    const { _id } = req.params;
    const { status } = req.body;

    try {
      const allowedStatuses = [
        "Pending",
        "Processing",
        "Delivered",
        "Cancelled",
      ];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status value." });
      }

      const updatedOrder = await Order.findByIdAndUpdate(
        _id,
        { status },
        { new: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found." });
      }

      res.status(200).json({
        message: "Order status updated successfully.",
        order: updatedOrder,
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ message: "Server error updating order status." });
    }
  }
);
adminRoutes.delete(
  "/cancel-order/:_id",

  async (req, res) => {
    const { _id } = req.params;

    try {
      // Find the order first
      const order = await Order.findById(_id);

      if (!order) {
        return res.status(404).json({ message: "Order not found." });
      }

      // Create a new cancelled order document
      const cancelledOrder = new CancelledOrder({
        userId: order.userId,
        items: order.items,
        totalAmount: order.totalAmount,
        status: "Cancelled",
      });

      await cancelledOrder.save(); // Save into CancelledOrder collection
      await order.deleteOne(); // Remove from Order collection

      res
        .status(200)
        .json({ message: "Order cancelled and moved successfully." });
    } catch (error) {
      console.error("Error cancelling order:", error);
      res.status(500).json({ message: "Server error cancelling order." });
    }
  }
);

adminRoutes.get(
  "/seeCancelledOrders",
 
  async (req, res) => {
    try {
      const cancelledOrders = await CancelledOrder.find()
        .populate("userId", "username email")
        .populate("items.productId", "name price");

      res.status(200).json(cancelledOrders);
    } catch (error) {
      console.error("Error fetching cancelled orders:", error);
      res.status(500).json({ message: "Server error fetching cancelled orders." });
    }
  }
);
export default adminRoutes;
