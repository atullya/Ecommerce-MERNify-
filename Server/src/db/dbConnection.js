import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoUri =
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecommerce";

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    const sanitizedUri = mongoUri.replace(
      /mongodb\+srv:\/\/([^:]+):([^@]+)@/i,
      "mongodb+srv://***:***@"
    );

    console.error("MongoDB connection failed. Check your MONGO_URI or MongoDB server.");
    console.error(`Attempted URI: ${sanitizedUri}`);
    console.error(`Connection error: ${error.message}`);
    return false;
  }
};
