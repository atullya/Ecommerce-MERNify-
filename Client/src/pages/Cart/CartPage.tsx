import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { useProductContext } from '@/ContextAPI/ProductContext';

const CartPage = () => {
  const { cart, removeFromCart, updateCartQuantity } = useProductContext();

  useEffect(() => {
    console.log("Cart item is", cart);
  }, [cart]);

  const calculateTotal = (product:any) => product.price * product.quantity;

  const handleQuantityChange = (productId:any, quantity:any) => {
    if (quantity > 0) {
      updateCartQuantity(productId, quantity);
    }
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
                      <img src={product.image[0]} alt={product.name} className="w-20 h-20 object-cover" />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                    <td className="border border-gray-300 px-4 py-2">${product.price.toFixed(2)}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        min="1"
                        value={product.quantity}
                        onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value, 10))}
                        className="w-16 text-center border border-gray-300 rounded"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">${calculateTotal(product).toFixed(2)}</td>
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
    </div>
  );
};

export default CartPage;
