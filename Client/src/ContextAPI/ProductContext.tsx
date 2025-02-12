import React, { createContext, useContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets.ts"; // Adjust the path as needed
import axios from "axios";
import { BASE_URL } from "@/App.tsx";

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

const fetchProducts = async (
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
) => {
  try {
    const proData = products; // Simulate fetching from API or file
    const pro = await axios.get(`${BASE_URL}/api/admin/products`);
    console.log("data", pro.data);
    // setProducts(proData);
    setProducts(pro.data.data);
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
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetchProducts(setProducts);
  }, []);

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalItemInCart(total);
  }, [cart]);

  const addToCart = (product: Product) => {
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
  };

  const getTotalCartAmount = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

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

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCart([]);
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
