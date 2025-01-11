import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

    console.log("MongoDB connection successful!!");
  } catch (error) {
    console.log("Error in connection", error);
  }
};
