import express from "express";
import Cart from "../models/cart.model.js";

const cartRoutes = express.Router();

// Add to Cart
cartRoutes.post("/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    await cart.populate("items.productId"); // Ensure product details are available

    // Calculate total price
    const totalPrice = cart.items.reduce((total, item) => {
      return total + item.quantity * (item.productId?.price || 0);
    }, 0);

    res.status(200).json({ success: true, cart, totalPrice });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding to cart" });
  }
});

// Get Cart with Total Price
cartRoutes.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    // Calculate total price
    const totalPrice = cart.items.reduce((total, item) => {
      return total + item.quantity * (item.productId?.price || 0);
    }, 0);

    res.status(200).json({ success: true, cart, totalPrice });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching cart" });
  }
});

// Update Cart Item Quantity
cartRoutes.put("/update", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      if (quantity > 0) {
        cart.items[itemIndex].quantity = quantity;
      } else {
        // Remove item if quantity is 0
        cart.items.splice(itemIndex, 1);
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    await cart.save();
    await cart.populate("items.productId"); // Ensure updated cart details

    // Recalculate total price
    const totalPrice = cart.items.reduce((total, item) => {
      return total + item.quantity * (item.productId?.price || 0);
    }, 0);

    res.status(200).json({ success: true, cart, totalPrice });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating quantity" });
  }
});

// Remove from Cart
cartRoutes.delete("/remove", async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    await cart.populate("items.productId"); // Ensure updated cart details

    // Recalculate total price
    const totalPrice = cart.items.reduce((total, item) => {
      return total + item.quantity * (item.productId?.price || 0);
    }, 0);

    res.status(200).json({ success: true, cart, totalPrice });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error removing from cart" });
  }
});

export default cartRoutes;
