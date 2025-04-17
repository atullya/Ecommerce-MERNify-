// server/routes/payment.js
import express from "express";
import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";

const paymentRoutes = express.Router();

paymentRoutes.post("/payment-success", async (req, res) => {
  const { amt, rid, pid, scd, userId } = req.body; // ✅ No username

  try {
    // Check if payment is already done
    const existingOrder = await Order.findOne({ transactionId: rid });

    if (existingOrder) {
      return res.status(400).json({ message: "Payment already completed for this transaction." });
    }

    // Fake payment verification
    const paymentVerified = true;

    if (paymentVerified) {
      const cart = await Cart.findOne({ userId }).populate("items.productId");

      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "Cart is empty or not found." });
      }

      const newOrder = new Order({
        userId,
        transactionId: rid,
        amount: amt,
        items: cart.items.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
        })),
      });

      await newOrder.save();

      // Clear user's cart after successful payment
      await Cart.findOneAndUpdate({ userId }, { items: [] });

      res.status(200).json({ message: "Fake Payment verified and order saved." });
    } else {
      res.status(400).json({ message: "Fake Payment verification failed." });
    }
  } catch (error) {
    console.error("Error in payment success:", error);
    res.status(500).json({ message: "Server error during fake payment processing." });
  }
});

export default paymentRoutes;
