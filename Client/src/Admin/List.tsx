import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminCompoenents/AdminNavbar";
import Sidebar from "./AdminCompoenents/Sidebar";
import axios from "axios";
import { BASE_URL } from "@/App";

const List = () => {
  const [products, setProducts] = useState([]);

  const fetchProduct = async () => {
    try {
      let res = await axios.get(`${BASE_URL}/api/admin/products`);
      console.log(res.data);
      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <AdminNavbar />
      <div className="flex w-full h-full gap-4 p-4">
        <Sidebar />
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-4">List Items</h1>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Image</th>
                  <th className="border border-gray-300 px-4 py-2">Title</th>
                  <th className="border border-gray-300 px-4 py-2">Price</th>
                  <th className="border border-gray-300 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: any) => (
                  <tr key={product._id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {/* <img
              className="rounded-full w-16 h-16 mx-auto"
              src={
                author?.profilePic
                  ? `http://localhost:4000/uploads/${author.profilePic
                      .split("\\")
                      .pop()}`
                  : "https://avatar.iran.liara.run/public/23" // Fallback image
              }
              alt={author?.username || "No Username"}
            /> */}
                      {product.image?.length > 0 ? (
                        <img
                          src={`http://localhost:3000/${product.image[0].replace(
                            /\\/g,
                            "/"
                          )}`}
                          alt={product.name}
                          className="w-16 h-16 object-cover mx-auto"
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      ${product.price}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button className="bg-red-500 text-white px-3 py-1 rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
