import React, { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import check from "../assets/check.png";

const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savePayment = async () => {
      try {
        const totalAmnt = localStorage.getItem("totalAmount");
        const amt = totalAmnt;
        const rid = "hardcoded-transaction-id-123";
        const pid = "hardcoded-product-id-456";
        const scd = "EPAYTEST";

        const userId = localStorage.getItem("userId");

        if (!userId) {
          console.error("User ID not found in localStorage.");
          return;
        }

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

    // 🚀 Always start timer independently after component loads
    const timer = setTimeout(() => {
      navigate("/");
    }, 4000); // 4 seconds

    // Cleanup timer when component unmounts
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
