import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./db/dbConnection.js";

const PORT = process.env.PORT || 3000;

connectDB().then((connected) => {
  if (!connected) {
    console.warn("Server started without a MongoDB connection. Fix MONGO_URI or MongoDB access to enable database features.");
  }

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
