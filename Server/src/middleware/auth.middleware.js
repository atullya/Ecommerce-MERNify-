import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; // Ensure this path is correct

export const authMiddleware = async (req, res, next) => {
  try {
    // Retrieve the JWT from cookies
    const token = req.cookies?.jwt;

    // Check if the token is missing
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Token not found" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    // If verification fails, token is invalid
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    // Fetch the user from the database using the decoded userId
    const user1 = await User.findById(decoded.userId);

    // If the user is not found
    if (!user1) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    // Attach the user to the request object for use in the next middleware or route handler
    req.user = user1;

    // Call the next middleware
    next();
  } catch (error) {
    // Handle different JWT-related errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid Token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token Expired" });
    }

    // Catch any other errors and log them
    console.error("Error in authMiddleware:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
