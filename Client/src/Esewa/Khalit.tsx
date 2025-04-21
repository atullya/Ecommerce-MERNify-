import Navbar from "@/components/Navbar/Navbar";
import { useProductContext } from "@/ContextAPI/ProductContext";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function KhaltKhaiPayment() {
  const { getTotalCartAmount } = useProductContext();
  const location = useLocation();
  const { totalAmount = 0, productName = [] } = location.state || {}; // Default to 0 and empty array
  const [amount, setAmount] = useState(totalAmount);
  const [transactionId, setTransactionId] = useState("asdfasdf");
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    // Log values to check state before submitting
    console.log("Amount:", amount);
    console.log("Product Name:", productName);
    console.log("Transaction ID:", transactionId);

    try {
      const payload = {
        amount: totalAmount,
        purchase_order_id: transactionId,
        purchase_order_name: "productName",
        customer_info: {
          name: "Test User",
          email: "test@example.com",
          phone: "9800000000",
        },
      };
      console.log("Request Payload:", payload);

      const response = await fetch(
        "http://localhost:3000/api/initiate-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error data from API:", errorData);
        throw new Error(
          `Payment initiation failed: ${JSON.stringify(errorData)}`
        );
      }

      const khaltiResponse = await response.json();
      console.log("Khalti payment initiated:", khaltiResponse);

      if (khaltiResponse && khaltiResponse.payment_url) {
        window.location.href = khaltiResponse.payment_url;
      } else {
        throw new Error("Payment URL not returned by Khalti API.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment initiation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 flex space-x-6">
        <div className="w-1/2 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <ul className="list-disc pl-5 space-y-1">
            {Array.isArray(productName) ? (
              productName.map((p: string, i: number) => <li key={i}>{p}</li>)
            ) : (
              <li>{productName}</li>
            )}
          </ul>
        </div>
        <div className="w-full max-w-md mx-4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-center">Khalti Payment</h2>
          <p className="text-sm text-center text-gray-600 mb-4">
            Enter payment details for Khalti
          </p>
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label
                htmlFor="amount"
                className="block  hidden text-sm font-medium"
              >
                Amount (NPR)
              </label>
              <input
                id="amount"
                type="number"
                value={amount}
                disabled
                className=" hidden w-full px-3 py-2 border rounded-md bg-gray-200 cursor-not-allowed"
              />
            </div>
            <div>
              <input
                id="productName"
                value={"productName"}
                required
                className=" hidden w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <input
                id="transactionId"
                value={"transactionId"}
                onChange={(e) => setTransactionId(e.target.value)}
                required
                className=" hidden w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="p-4 bg-white border rounded-lg shadow-md">
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span>Items Total (3 Items)</span>
                  <span>Rs {amount}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Delivery Fee</span>
                  <span>Rs 0</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>Rs {amount}</span>
                </div>
                <p className="text-xs text-gray-500">All taxes included</p>
              </div>
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
    </div>
  );
}
