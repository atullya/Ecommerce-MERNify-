import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import { useProductContext } from "@/ContextAPI/ProductContext";
import { Link, NavLink } from "react-router-dom";
import esewa from "../.../../../assets/esewa.png";
import khalti from "../.../../../assets/khalti.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface CartItem {
  productId: {
    _id: string;
    name: string;
    price: number;
    image: string[];
  };
  quantity: number;
}

const CartPage = () => {
  const { cart, removeFromCart, updateCartQuantity, getTotalCartAmount } =
    useProductContext();
  const [cartItem, setCartItem] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  let [price, setPrice] = useState<{ totalPrice: number } | null>(null);
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");

  useEffect(() => {
    console.log("Cart item is", cart);
  }, [cart]);

  let loadCartItem = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.log("User ID not found in localStorage");
        return;
      }
      
      // Make sure your API URL is correct
      const res = await axios.get(`http://localhost:3000/api/cart/${userId}`, {
        withCredentials: true,
      });

      console.log("Cart Response:", res.data);

      if (res.data.cart && res.data.cart.items) {
        setPrice(res.data); // Set total price
        setCartItem(res.data.cart.items); // Set the cart items
        localStorage.setItem("totalCartItem", res.data.cart.items.length.toString());
      } else {
        console.log("No cart items found");
      }
    } catch (error) {
      console.log("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    loadCartItem();
  }, []);



  const handleQuantityChange = async (productId: string, quantity: number) => {
    if (quantity > 0) {
      try {
        const userId = localStorage.getItem("userId");
        const res = await axios.put("http://localhost:3000/api/cart/update", {
          userId,
          productId,
          quantity,
        });

        if (res.data.success) {
          loadCartItem(); // Reload updated cart items
        }
      } catch (error) {
        console.log("Error updating quantity:", error);
      }
    }
  };

  const handleProceedToCheckout = () => {
    if (cartItem.length === 0) {
      alert("Cart is empty");
      return;
    }
    setIsModalOpen(true);
  };

  const deleteCart = async (productId: string) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.log("User ID is missing");
        return;
      }

      let res = await axios.delete("http://localhost:3000/api/cart/remove", {
        data: { userId, productId },
      });

      console.log(res.data);
      if (res.data.success) {
        toast.success("Product Deleted Successfully");
        setCartItem(cartItem.filter((item) => item.productId._id !== productId));
      }
    } catch (error) {
      console.log("Error deleting cart item:", error);
    }
  };

  const handlePromo = () => {
    if (isPromoApplied) {
      alert("Promo code has already been applied.");
      return;
    }

    if (promoCode === "MERN") {
      const currentPrice = price?.totalPrice ?? 0;
      const discount = currentPrice * 0.1;
      const newPrice = currentPrice - discount;
      setPrice({ totalPrice: newPrice });
      setIsPromoApplied(true);
      setPromoCode(""); // Clear promo code input
      toast.success("Promo code applied successfully!");
    } else {
      toast.error("Invalid promo code.");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cartItem.length === 0 ? (
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
                {cartItem.map((product: any) => (
                  <tr key={product.productId._id}>
                    <td className="border border-gray-300 px-4 py-2">
                      <img
                        src={`http://localhost:3000/${product.productId.image[0].replace(
                          /\\/g,
                          "/"
                        )}`}
                        alt={product.productId.name}
                        className="w-20 h-20 object-cover"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.productId.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Rs.{product.productId.price.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        min="1"
                        value={product.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            product.productId._id,
                            Number(e.target.value)
                          )
                        }
                        className="w-16 text-center border border-gray-300 rounded"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Rs. {product.quantity * product.productId.price}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => deleteCart(product.productId._id)}
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
              <p className="text-lg"> Rs. {price?.totalPrice ?? 0}</p>
            </div>
            <hr />
            <div className="flex justify-between py-4">
              <p className="text-lg">Shipping Fee</p>
              <p className="text-lg">Free</p>
            </div>
            <hr />
            <div className="flex justify-between py-2 font-semibold text-xl">
              <h3>Total</h3>
              <h3> Rs. {price?.totalPrice ?? 0}</h3>
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
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="bg-transparent border-none outline-none w-[330px] h-full text-lg"
            />
            <button
              onClick={handlePromo}
              className="w-40 h-full bg-black text-white text-lg cursor-pointer"
            >
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
                <NavLink
                  to="/payment"
                  state={{
                    productName: cartItem.map(
                      (item: any) => item.productId.name
                    ),
                    totalAmount: price?.totalPrice ?? 0,
                  }}
                  className="text-blue-500"
                >
                  <img src={esewa} alt="" className="h-20 w-22" />
                </NavLink>
              </label>

              <label className="flex items-center">
                <NavLink
                  to="/khalti"
                  state={{
                    productName: cartItem.map(
                      (item: any) => item.productId.name
                    ),
                    totalAmount: price?.totalPrice ?? 0,
                  }}
                  className="text-blue-500"
                >
                  <img src={khalti} alt="" className="h-30 w-32 ml-2" />
                </NavLink>
              </label>
            </div>

            <div className="flex justify-end mt-6 gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
