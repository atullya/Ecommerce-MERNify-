import React, { createContext, useContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets.ts"; // Adjust the path as needed

// Product interface
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

// CartItem interface extending Product
interface CartItem extends Product {
  quantity: number;
}

// User interface
interface User {
  id: string;
  name: string;
  email: string;
}

// Product context type with authentication
interface ProductContextType {
  products: Product[];
  cart: CartItem[];
  totalItemInCart: number;
  user: User | null;
  isAuthenticated: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  login: (userData: User) => void;
  logout: () => void;
}

// Create context
export const ProductContext = createContext<ProductContextType>({
  products: [],
  cart: [],
  totalItemInCart: 0,
  user: null,
  isAuthenticated: false,
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartQuantity: () => {},
  login: () => {},
  logout: () => {},
});

// Custom hook to use the Product context
export const useProductContext = () => {
  return useContext(ProductContext);
};

// Function to fetch products (simulated here)
const fetchProducts = async (setProducts: React.Dispatch<React.SetStateAction<Product[]>>) => {
  try {
    const proData = products; // Simulate fetching from API or file
    setProducts(proData);
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

// Product provider component
export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalItemInCart, setTotalItemInCart] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetchProducts(setProducts);
  }, []);

  useEffect(() => {
    // Update totalItemInCart whenever cart changes
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalItemInCart(total);
  }, [cart]);

  // Function to add a product to the cart
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((item) => item._id === product._id);
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1; // Increase quantity
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }]; // Add new product with quantity 1
      }
    });
  };

  // Function to remove a product from the cart
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

  // Function to update the cart quantity
  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Function to log in the user
  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Function to log out the user
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCart([]); // Optionally clear the cart on logout
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
        login,
        logout,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
