import React, { createContext, useContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets.ts"; // Adjust the path as needed
import axios from "axios";
import { BASE_URL } from "@/App.tsx";
import { getTokenFromLocalStorage } from "@/components/LocalStorage.ts";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  date: number;
  bestseller: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface ProductContextType {
  products: Product[];
  cart: CartItem[];
  totalItemInCart: number;
  user: User | null;
  isAuthenticated: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  getTotalCartAmount: () => number;
  login: (userData: User) => void;
  logout: () => void;
}

export const ProductContext = createContext<ProductContextType>({
  products: [],
  cart: [],
  totalItemInCart: 0,
  user: null,
  isAuthenticated: false,
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartQuantity: () => {},
  getTotalCartAmount: () => 0,
  login: () => {},
  logout: () => {},
});

export const useProductContext = () => {
  return useContext(ProductContext);
};

// Fetching Products
const fetchProducts = async (
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/admin/products`);
    console.log("data", response.data);
    setProducts(response.data.data);
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalItemInCart, setTotalItemInCart] = useState(0);
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  // Fetch products on load
  useEffect(() => {
    fetchProducts(setProducts);
  }, []);

  // Update total item count when cart changes
  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalItemInCart(total);
  }, [cart]);

  // Add to Cart
  const addToCart = async (product: Product) => {
    const token = getTokenFromLocalStorage();
    if (!token) {
      console.log("User Not Logged In");
      return;
    }
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.post(
        `${BASE_URL}/api/cart/add`,
        {
          userId: userId,
          productId: product._id,
          quantity: 1,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Cart updated:", response.data);

      // Update local cart state
      setCart((prevCart) => {
        const existingProductIndex = prevCart.findIndex(
          (item) => item._id === product._id
        );
        if (existingProductIndex !== -1) {
          const updatedCart = [...prevCart];
          updatedCart[existingProductIndex].quantity += 1;
          return updatedCart;
        } else {
          return [...prevCart, { ...product, quantity: 1 }];
        }
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  // Get total amount in cart
  const getTotalCartAmount = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Remove from cart
  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart
        .map((product) =>
          product._id === productId
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
        .filter((product) => product.quantity > 0)
    );
  };

  // Update cart item quantity
  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Login
  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCart([]);
    localStorage.removeItem("user");
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        cart,
        totalItemInCart,
        user,
        isAuthenticated,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        getTotalCartAmount,
        login,
        logout,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
