import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import { useProductContext } from "@/ContextAPI/ProductContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, updateCartQuantity, getTotalCartAmount } =
    useProductContext();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");

  useEffect(() => {
    console.log("Cart item is", cart);
  }, [cart]);

  const calculateTotal = (product: any) => product.price * product.quantity;

  const handleQuantityChange = (productId: any, quantity: any) => {
    if (quantity > 0) {
      updateCartQuantity(productId, quantity);
    }
  };

  const handleProceedToCheckout = () => {
    setIsModalOpen(true);
  };

  const handlePayment = () => {
    if (!selectedPayment) {
      alert("Please select a payment method.");
      return;
    }
    alert(`Processing payment with ${selectedPayment}`);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Products</th>
                  <th className="border border-gray-300 px-4 py-2">Title</th>
                  <th className="border border-gray-300 px-4 py-2">Price</th>
                  <th className="border border-gray-300 px-4 py-2">Quantity</th>
                  <th className="border border-gray-300 px-4 py-2">Total</th>
                  <th className="border border-gray-300 px-4 py-2">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => (
                  <tr key={product._id}>
                    <td className="border border-gray-300 px-4 py-2">
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-20 h-20 object-cover"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        min="1"
                        value={product.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            product._id,
                            parseInt(e.target.value, 10)
                          )
                        }
                        className="w-16 text-center border border-gray-300 rounded"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      ${calculateTotal(product).toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => removeFromCart(product._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        &#x2715;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Cart Totals Section */}
      <div className="flex my-18 p-24">
        <div className="flex flex-col flex-1 mr-52 gap-10">
          <h1 className="text-2xl font-bold">Cart Totals</h1>
          <div>
            <div className="flex justify-between py-2">
              <p className="text-lg">Subtotal</p>
              <p className="text-lg">${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="flex justify-between py-4">
              <p className="text-lg">Shipping Fee</p>
              <p className="text-lg">Free</p>
            </div>
            <hr />
            <div className="flex justify-between py-2 font-semibold text-xl">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button
            onClick={handleProceedToCheckout}
            className="w-60 h-14 bg-red-500 text-white font-semibold text-lg border-none outline-none cursor-pointer"
          >
            Proceed to Checkout
          </button>
        </div>

        {/* Promo Code Section */}
        <div className="flex-1 text-lg font-medium">
          <p className="text-black">If you have a promo code, enter it here</p>
          <div className="flex mt-4 w-[390px] h-14 bg-gray-300 pl-5">
            <input
              type="text"
              placeholder="Promo code"
              className="bg-transparent border-none outline-none w-[330px] h-full text-lg"
            />
            <button className="w-40 h-full bg-black text-white text-lg cursor-pointer">
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Payment Selection */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>

            <div className="flex flex-col gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedPayment === "eSewa"}
                  onChange={() => setSelectedPayment("eSewa")}
                  className="mr-2"
                />
                <Link to="/payment" className="text-blue-500">
                  Pay with eSewa
                </Link>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedPayment === "Khalti"}
                  onChange={() => setSelectedPayment("Khalti")}
                  className="mr-2"
                />
                <Link to={"/khalti"} className="text-blue-500">
                  Pay with Khalti
                </Link>
              </label>
            </div>

            <div className="flex justify-end mt-6 gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
