import React, { useState } from "react";
import Sidebar from "./AdminCompoenents/Sidebar";
import upload_area from "@/assets/upload_area.png";
import AdminNavbar from "./AdminCompoenents/AdminNavbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Add = () => {
  const [images, setImages] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productCategory, setProductCategory] = useState<string>("Men");
  const [productSubCategory, setProductSubCategory] =
    useState<string>("topwear");
  const [productPrice, setProductPrice] = useState<number>(0);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [isBestSeller, setIsBestSeller] = useState<boolean>(false);

  const handleSizeChange = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleImageChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[index] = file;
        return updatedImages;
      });
    }
  };

  const addProduct = async () => {
    try {
      console.log({
        productName,
        productDescription,
        productCategory,
        productSubCategory,
        productPrice,
        selectedSizes,
        isBestSeller,
        images,
      });

      const formData = new FormData();
      formData.append("name", productName);
      formData.append("description", productDescription);
      formData.append("category", productCategory);
      formData.append("subCategory", productSubCategory);
      formData.append("price", productPrice.toString());
      formData.append("sizes", selectedSizes.join(","));
      formData.append("bestseller", isBestSeller.toString());

      images.forEach((image) => {
        if (image) {
          formData.append("images", image);
        }
      });

      const res = await axios.post(
        "http://localhost:3000/api/admin/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log(res.data);
      if (res.data?.success) {
        toast.success(res.data.message);

        // ✅ Reset state properly
        setTimeout(() => {
          setImages([null, null, null, null]);
          setProductName("");
          setProductDescription("");
          setProductCategory("Men");
          setProductSubCategory("topwear");
          setProductPrice(0);
          setSelectedSizes([]);
          setIsBestSeller(false);
        }, 100);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <AdminNavbar />
      <div className="flex w-full h-full gap-4 p-4">
        <Sidebar />
        <form
          className="flex flex-col gap-4 p-4 w-full items-start"
          onSubmit={(e) => {
            e.preventDefault();
            addProduct();
          }}
        >
          <p className="mb-2">Upload Images</p>
          <div className="flex gap-2">
            {images.map((image, index) => {
              const imageUrl = image ? URL.createObjectURL(image) : upload_area;

              return (
                <label htmlFor={`image${index + 1}`} key={index}>
                  <img
                    src={imageUrl}
                    className="w-20"
                    alt={`Upload Preview ${index + 1}`}
                    onLoad={() => image && URL.revokeObjectURL(imageUrl)} // ✅ Fix
                  />
                  <input
                    type="file"
                    id={`image${index + 1}`}
                    hidden
                    accept="image/*"
                    onChange={(e) => handleImageChange(index, e)}
                  />
                </label>
              );
            })}
          </div>

          <div>
            <p className="mb-2">Product Name</p>
            <input
              type="text"
              placeholder="Type Here"
              required
              className="w-full max-w-[500px] px-3 py-2"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div>
            <p className="mb-2">Product description</p>
            <textarea
              placeholder="Write Content Here"
              className="w-full max-w-[500px] px-3 py-2"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
            <div>
              <p className="mb-2">Product Category</p>
              <select
                className="w-full px-3 py-2"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div>
              <p className="mb-2">Sub Category</p>
              <select
                className="w-full px-3 py-2"
                value={productSubCategory}
                onChange={(e) => setProductSubCategory(e.target.value)}
              >
                <option value="topwear">Topwear</option>
                <option value="bottomwear">Bottomwear</option>
                <option value="winterwear">Winterwear</option>
              </select>
            </div>

            <div>
              <p className="mb-2">Product Price</p>
              <input
                type="number"
                min={0}
                className="w-full px-3 py-2 sm:w-[120px]"
                value={productPrice}
                onChange={(e) => setProductPrice(parseInt(e.target.value))}
              />
            </div>
          </div>

          <div>
            <p className="mb-2">Product sizes</p>
            <div className="flex gap-3">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <label key={size} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="hidden peer"
                    value={size}
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                  />
                  <p className="bg-slate-200 px-3 py-1 peer-checked:bg-blue-500 peer-checked:text-white">
                    {size}
                  </p>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <input
              type="checkbox"
              id="bestseller"
              checked={isBestSeller}
              onChange={(e) => setIsBestSeller(e.target.checked)}
            />
            <label className="cursor-pointer" htmlFor="bestseller">
              Add to bestseller
            </label>
          </div>
          <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
            ADD
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Add;
