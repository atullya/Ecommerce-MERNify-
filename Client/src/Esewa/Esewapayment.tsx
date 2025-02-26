import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useProductContext } from "@/ContextAPI/ProductContext";

interface FormData {
  amount: string;
  productName: string;
  transactionId: string;
}

const EsewaPayment: React.FC = () => {
  const merchantCode = "EPAYTEST"; // Replace with your actual merchant code
  const secretKey = "8gBm/:&EnhH.1/q"; // Replace with your actual secret key
  const successUrl = "http://yourdomain.com/payment-success"; // Replace with your success URL
  const failureUrl = "http://yourdomain.com/payment-failure"; // Replace with your failure URL

  const { getTotalCartAmount } = useProductContext();
  const location = useLocation();
  
  // Get the total amount from context or URL state
  const totalAmount = Number(location.state?.totalAmount) || getTotalCartAmount();

  // State for form data
  const [formData, setFormData] = useState<FormData>({
    amount: totalAmount.toFixed(2), // Ensure it's a valid numeric string
    productName: "",
    transactionId: "",
  });

  // Update amount if totalAmount changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, amount: totalAmount.toFixed(2) }));
  }, [totalAmount]);

  // Function to generate eSewa signature
  const generateEsewaSignature = async (
    secretKey: string,
    amount: string,
    transactionUuid: string,
    merchantCode: string
  ): Promise<string> => {
    const signatureString = `total_amount=${amount},transaction_uuid=${transactionUuid},product_code=${merchantCode}`;
    const encoder = new TextEncoder();
    const key = encoder.encode(secretKey);
    const message = encoder.encode(signatureString);

    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      key,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signature = await crypto.subtle.sign("HMAC", cryptoKey, message);
    return btoa(String.fromCharCode(...new Uint8Array(signature)));
  };

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "amount" ? value.replace(/[^0-9.]/g, "") : value, // Ensure only numbers for amount
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { amount, productName, transactionId } = formData;

    if (!amount || !productName || !transactionId) {
      alert("Please fill out all fields.");
      return;
    }

    const transactionUuid = `txn-${Date.now()}`; // Unique transaction identifier

    try {
      // Ensure amount is formatted correctly
      const formattedAmount = parseFloat(amount).toFixed(2);

      // Generate signature
      const signature = await generateEsewaSignature(
        secretKey,
        formattedAmount,
        transactionUuid,
        merchantCode
      );

      // Prepare eSewa payment parameters
      const esewaConfig = {
        amount: formattedAmount,
        tax_amount: "0",
        total_amount: formattedAmount,
        transaction_uuid: transactionUuid,
        product_code: merchantCode,
        product_service_charge: "0",
        product_delivery_charge: "0",
        success_url: successUrl,
        failure_url: failureUrl,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature,
      };

      // Create and submit the form dynamically
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

      Object.entries(esewaConfig).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Error generating eSewa signature:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>eSewa Payment</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="transactionId">Transaction ID:</label>
          <input
            type="text"
            id="transactionId"
            name="transactionId"
            value={formData.transactionId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Pay with eSewa</button>
      </form>
    </div>
  );
};

export default EsewaPayment;
