import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import { connectDB } from "./db/dbConnection.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

//middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow credentials (cookies) to be sent
  })
);
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

//port
app.get("/", (req, res) => {
  res.send("Hello");
});
const PORT = process.env.PORT || 30001;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started on port ${PORT}`);
});
