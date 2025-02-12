import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
});

// Virtual field to calculate total price dynamically
cartSchema.virtual("totalPrice").get(function () {
  return this.items.reduce((total, item) => {
    if (item.productId && item.productId.price) {
      return total + item.quantity * item.productId.price;
    }
    return total;
  }, 0);
});

// Ensure virtual fields are included when converting to JSON
cartSchema.set("toJSON", { virtuals: true });
cartSchema.set("toObject", { virtuals: true });

export default mongoose.model("Cart", cartSchema);
