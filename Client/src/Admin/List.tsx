import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminCompoenents/AdminNavbar";
import Sidebar from "./AdminCompoenents/Sidebar";
import axios from "axios";
import { BASE_URL } from "@/App";
import { toast, ToastContainer } from "react-toastify";

interface Product {
  _id: string;
  name: string;
  price: string;
  image: string[];
  description?: string;
  category?: string;
  subCategory?: string;
  sizes?: string[];
}

const List = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/products`);
      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const res = await axios.delete(`${BASE_URL}/api/admin/delete/${id}`);
      if (res.data.success) {
        toast.success("Product Deleted Successfully");
        fetchProduct();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editProduct = async (id: string) => {
    try {
      console.log("Fetching product with ID:", id);
      const res = await axios.patch(`${BASE_URL}/api/admin/update/${id}`);
      if (res.data.success) {
        setSelectedProduct(res.data.data);
        setIsModalOpen(true); // Open modal only if product is found
      }
    } catch (error: any) {
      console.error("Error fetching product:", error.response?.data || error);
      toast.error("Product not found or server error.");
      setIsModalOpen(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    try {
      const res = await axios.patch(
        `${BASE_URL}/api/admin/update/${selectedProduct._id}`,
        selectedProduct
      );
      if (res.data.success) {
        toast.success("Product Updated Successfully");
        setIsModalOpen(false);
        fetchProduct();
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
                  <th className="border border-gray-300 px-4 py-2">Category</th>
                  <th className="border border-gray-300 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="border border-gray-300 px-4 py-2">
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
                      Rs. {product.price}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.category}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 flex gap-4">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => deleteProduct(product._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-pink-500 text-white px-3 py-1 rounded"
                        onClick={() => editProduct(product._id)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />

      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Edit Product
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {/* Name */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={selectedProduct.name}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      name: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={selectedProduct.description || ""}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      description: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  value={selectedProduct.price}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      price: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  value={selectedProduct.category || ""}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      category: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
              </div>

              {/* Subcategory */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Subcategory
                </label>
                <input
                  type="text"
                  value={selectedProduct.subCategory || ""}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      subCategory: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
              </div>

              {/* Sizes */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Sizes
                </label>
                <div className="flex gap-4 flex-wrap">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <label
                      key={size}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={selectedProduct.sizes?.includes(size) || false}
                        onChange={(e) => {
                          const updatedSizes = e.target.checked
                            ? [...(selectedProduct.sizes || []), size]
                            : (selectedProduct.sizes || []).filter((s) => s !== size);
                          setSelectedProduct({
                            ...selectedProduct,
                            sizes: updatedSizes,
                          });
                        }}
                      />
                      {size}
                    </label>
                  ))}
                </div>
              </div>

              {/* Images */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Images
                </label>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.image.map((img, index) => (
                    <img
                      key={index}
                      src={`http://localhost:3000/${img.replace(/\\/g, "/")}`}
                      alt={`Product ${index + 1}`}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-6 gap-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default List;