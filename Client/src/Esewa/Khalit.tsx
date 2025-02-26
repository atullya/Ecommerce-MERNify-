import { useProductContext } from "@/ContextAPI/ProductContext";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function KhaltKhaiPayment() {
  const { getTotalCartAmount } = useProductContext();
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || getTotalCartAmount();
  
  const [amount, setAmount] = useState(totalAmount);
  const [productName, setProductName] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/initiate-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: totalAmount, // Fixed amount
            purchase_order_id: transactionId,
            purchase_order_name: productName,
            customer_info: {
              name: "Test User",
              email: "test@example.com",
              phone: "9800000000",
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Payment initiation failed: ${JSON.stringify(errorData)}`
        );
      }

      const khaltiResponse = await response.json();
      console.log("Khalti payment initiated:", khaltiResponse);

      window.location.href = khaltiResponse.payment_url;
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment initiation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md mx-4 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center">Khalti Payment</h2>
        <p className="text-sm text-center text-gray-600 mb-4">
          Enter payment details for Khalti
        </p>
        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium">
              Amount (NPR)
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-gray-200 cursor-not-allowed"
            />
          </div>
          <div>
            <label htmlFor="productName" className="block text-sm font-medium">
              Product Name
            </label>
            <input
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="transactionId" className="block text-sm font-medium">
              Transaction ID
            </label>
            <input
              id="transactionId"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Pay with Khalti"}
          </button>
        </form>
      </div>
    </div>
  );
}
