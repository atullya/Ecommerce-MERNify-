import mongoose from "mongoose";

// Define the product schema
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: [String], required: true }, // Array of image URLs
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: [String], required: true }, // Array of sizes
    date: { type: Number, required: true, default: Date.now }, // Assuming date is a timestamp
    bestseller: { type: Boolean, default: false }, // Default to false
  },
  { timestamps: true }
); // Automatically manage createdAt and updatedAt fields
export default mongoose.model("Product", productSchema);
// Create the model
