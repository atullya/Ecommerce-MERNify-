import React, { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import check from "../assets/check.png";

const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Immediately set isPayed = true
    localStorage.setItem("isPayed", "true");

    const savePayment = async () => {
      try {
        const totalAmnt = localStorage.getItem("totalAmount");
        const amt = totalAmnt;
        const pid = "hardcoded-product-id-456"; // (You can also make this dynamic if needed)
        const scd = "EPAYTEST";

        const userId = localStorage.getItem("userId");

        if (!userId) {
          console.error("User ID not found in localStorage.");
          return;
        }

        // ✅ Generate unique rid
        const timestamp = Date.now(); // current time in milliseconds
        const rid = `${userId}-${timestamp}`;

        await axios.post("http://localhost:3000/api/payment/payment-success", {
          amt,
          rid,
          pid,
          scd,
          userId,
        });

        console.log("Payment saved successfully!");
      } catch (error) {
        console.error("Error saving payment:", error);
      }
    };

    savePayment();

    const timer = setTimeout(() => {
      navigate("/");
    }, 4000);

    return () => clearTimeout(timer);
  }, [location, navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src={check} alt="Payment Success" className="w-32 h-32 mb-4" />
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="text-gray-500 mt-2">Redirecting to home...</p>
    </div>
  );
};

export default PaymentSuccess;
