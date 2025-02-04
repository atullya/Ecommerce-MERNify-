import { useProductContext } from "@/ContextAPI/ProductContext";

import React, { useState, ChangeEvent, FormEvent } from "react";

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { amount, productName, transactionId } = formData;

    if (!amount || !productName || !transactionId) {
      alert("Please fill out all fields.");
      return;
    }

    const transactionUuid = `txn-${Date.now()}`; // Unique identifier for the transaction

    try {
      const signature = await generateEsewaSignature(
        secretKey,
        amount,
        transactionUuid,
        merchantCode
      );

      // Prepare eSewa payment parameters
      const esewaConfig = {
        amount,
        tax_amount: "0",
        total_amount: amount,
        transaction_uuid: transactionUuid,
        product_code: merchantCode,
        product_service_charge: "0",
        product_delivery_charge: "0",
        success_url: successUrl,
        failure_url: failureUrl,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature,
      };

      // Create a form dynamically and submit to eSewa
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

      for (const [key, value] of Object.entries(esewaConfig)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Error generating eSewa signature:", error);
      alert("An error occurred. Please try again.");
    }
  };
  const { getTotalCartAmount } = useProductContext();
  const [formData, setFormData] = useState<FormData>({
    amount: getTotalCartAmount().toString(),
    productName: "",
    transactionId: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
