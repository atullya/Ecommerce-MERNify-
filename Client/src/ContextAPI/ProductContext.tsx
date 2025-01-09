import React, { createContext, useContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets.ts"; // Adjust the path as needed

// Define types for product data
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

// Define the context type
interface ProductContextType {
  products: Product[];
}

// Create Context with a default value
export const ProductContext = createContext<ProductContextType>({ products: [] });

// Custom hook to use the ProductContext
export const useProductContext = () => {
  return useContext(ProductContext);
};

// Function to fetch products from API (using static data for now)
const getProduct = async (setProducts: React.Dispatch<React.SetStateAction<Product[]>>) => {
  try {
    // Using static data instead of API for now
    const proData = products; // Use the imported `products` array
    // console.log(proData); // Log the fetched data
    setProducts(proData); // Set fetched products to state
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

// ProductProvider component to manage state and provide context
export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]); // State to store products

  // Fetch products when the component mounts
  useEffect(() => {
    getProduct(setProducts);
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};
