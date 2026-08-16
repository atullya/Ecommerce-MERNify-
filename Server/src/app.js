import express from "express";
import axios from "axios";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.routes.js";
import paymentRoutes from "./routes/newOrderRoutes.js";
import { fileURLToPath } from "url";
import path from "path";
import cartRoutes from "./routes/addToCart.routes.js";

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

const KHALTI_SECRET_KEY = process.env.KHALTI_SECRET_KEY;

app.post("/api/initiate-payment", async (req, res) => {
  try {
    console.log("Received payment request:", req.body);

    const { amount, purchase_order_id, purchase_order_name, customer_info } = req.body;

    if (!amount || !purchase_order_id || !purchase_order_name || !customer_info) {
      return res.status(400).json({ error: "Missing required payment details" });
    }

    if (!KHALTI_SECRET_KEY) {
      return res.status(500).json({ error: "Payment gateway not configured" });
    }

    const khaltiConfig = {
      return_url: `${FRONTEND_URL}/payment-success`,
      website_url: FRONTEND_URL,
      amount: amount * 100,
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
    console.error("Khalti Payment Error:", error.response?.data || error.message);
    res.status(500).json({
      error: error.response?.data || "Server Error",
      message: error.message,
    });
  }
});

app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Hello, Server is running!");
});

export default app;
