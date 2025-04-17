import dotenv from "dotenv";
dotenv.config();

import express from "express";
import axios from "axios";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.routes.js";
import paymentRoutes from "./routes/newOrderRoutes.js";
import { connectDB } from "./db/dbConnection.js";
import { fileURLToPath } from "url";
import path from "path";
import cartRoutes from "./routes/addToCart.routes.js";
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies
  })
);
app.use(express.json());
app.use(cookieParser());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from uploads directory
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

const KHALTI_SECRET_KEY =
  process.env.KHALTI_SECRET_KEY ||
  "live_secret_key_68791341fdd94846a146f0457ff7b455";

// Endpoint to initiate Khalti payment
app.post("/api/initiate-payment", async (req, res) => {
  try {
    // Logging request body
    console.log("Received payment request:", req.body);

    const { amount, purchase_order_id, purchase_order_name, customer_info } =
      req.body;

    // Validate request body
    if (
      !amount ||
      !purchase_order_id ||
      !purchase_order_name ||
      !customer_info
    ) {
      return res
        .status(400)
        .json({ error: "Missing required payment details" });
    }

    const khaltiConfig = {
      return_url: "http://localhost:5173/",
      website_url: "http://localhost:5173",
      amount: amount * 100, // Convert to paisa
      purchase_order_id,
      purchase_order_name,
      customer_info,
    };

    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      khaltiConfig,
      {
        headers: {
          Authorization: `Key ${KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Khalti Payment Error:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: error.response?.data || "Server Error",
      message: error.message,
    });
  }
});

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);
// Default Route
app.get("/", (req, res) => {
  res.send("Hello, Server is running!");
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started on port ${PORT}`);
});
