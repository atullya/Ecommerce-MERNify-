// models/cancelledOrder.model.js
import mongoose from "mongoose";

const cancelledOrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  totalAmount: Number,
  status: { type: String, default: "Cancelled" },
  cancelledAt: { type: Date, default: Date.now },
});

const CancelledOrder = mongoose.model("CancelledOrder", cancelledOrderSchema);

export default CancelledOrder;
