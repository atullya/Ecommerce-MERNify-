// server/models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    transactionId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    status: { type: String, default: "Pending" }, // e.g., Pending, Completed
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
