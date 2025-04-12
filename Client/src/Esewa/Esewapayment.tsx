import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";

interface FormData {
  amount: string;
  productName: string;
  transactionId: string;
}

const EsewaPayment: React.FC = () => {
  const location = useLocation();
  const { totalAmount = 0, productName = [] } = location.state || {};

  // console.log("Received totalAmount:", totalAmount);
  // console.log("Received productName:", productName);

  const [formData, setFormData] = useState<FormData>({
    amount: totalAmount.toFixed(2),
    productName: Array.isArray(productName)
      ? productName.join(", ")
      : productName,
    transactionId: `txn-${Date.now()}`,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      amount: totalAmount.toFixed(2),
      productName: Array.isArray(productName)
        ? productName.join(", ")
        : productName,
    }));
  }, [totalAmount, productName]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? value.replace(/[^0-9.]/g, "") : value,
    }));
  };

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { amount, productName, transactionId } = formData;

    const signature = await generateEsewaSignature(
      "8gBm/:&EnhH.1/q",
      amount,
      transactionId,
      "EPAYTEST"
    );

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    const config = {
      amount,
      tax_amount: "0",
      total_amount: amount,
      transaction_uuid: transactionId,
      product_code: "EPAYTEST",
      product_service_charge: "0",
      product_delivery_charge: "0",
      success_url: "http://yourdomain.com/payment-success",
      failure_url: "http://yourdomain.com/payment-failure",
      signed_field_names: "total_amount,transaction_uuid,product_code",
      signature,
    };

    Object.entries(config).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 flex space-x-6">
        {/* Order Summary */}
        <div className="w-1/2 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <ul className="list-disc pl-5 space-y-1">
            {Array.isArray(productName) ? (
              productName.map((p: string, i: number) => <li key={i}>{p}</li>)
            ) : (
              <li>{productName}</li>
            )}
          </ul>
          <div className="mt-4 font-bold">Total: Rs {formData.amount}</div>
        </div>

        {/* Payment Form */}
        <div className="w-1/2 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="amount" value={formData.amount} />
            <input
              type="hidden"
              name="productName"
              value={formData.productName}
            />
            <input
              type="hidden"
              name="transactionId"
              value={formData.transactionId}
            />

            <div className="p-4 bg-white border rounded-lg shadow-md">
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span>Items Total (3 Items)</span>
                  <span>Rs {formData.amount}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Delivery Fee</span>
                  <span>Rs 0</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  {/* parseFloat(formData.amount) + 10).toFixed(2) */}
                  <span>Rs {formData.amount}</span>
                </div>
                <p className="text-xs text-gray-500">All taxes included</p>
              </div>

              <button
                type="submit"
                className="mt-4 w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
              >
                Proceed to Pay
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EsewaPayment;
