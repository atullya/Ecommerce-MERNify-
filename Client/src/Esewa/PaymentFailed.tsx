import React from "react";
import check from "../assets/cross.png";
const PaymentFailed = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen">
        <img src={check} alt="Payment Success" className="w-32 h-32 mb-4" />
        <h1 className="text-3xl font-bold text-red-600">Payment Failed!</h1>
        <p className="text-gray-500 mt-2">Redirecting to home...</p>
      </div>
    </div>
  );
};

export default PaymentFailed;
