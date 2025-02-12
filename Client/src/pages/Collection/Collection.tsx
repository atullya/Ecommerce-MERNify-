import { assets } from "@/assets/frontend_assets/assets";
import Navbar from "@/components/Navbar/Navbar";
import { useProductContext } from "@/ContextAPI/ProductContext";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Define the Product interface
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

const Collection = () => {
  const { products } = useProductContext();
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState<Product[]>(products);
  const [category, setCategory] = useState<string[]>([]);
  const [subcategory, setSubCategory] = useState<string[]>([]);
  const [sortType, setSortType] = useState<string>("relevant");

  // Toggle category selection
  const toggleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Toggle subcategory selection
  const toggleSubCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Filter products based on selected categories and subcategories
  useEffect(() => {
    let filteredProducts = products.filter(
      (product) =>
        (category.length === 0 || category.includes(product.category)) &&
        (subcategory.length === 0 || subcategory.includes(product.subCategory))
    );

    // Sort products based on sortType
    if (sortType === "low-high") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(filteredProducts);
  }, [category, subcategory, sortType, products]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col p-10 sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
        {/* Filter Options */}
        <div className="min-w-60">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="my-2 text-xl flex items-center cursor-pointer gap-2"
          >
            FILTERS
          </p>
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="Dropdown Icon"
          />
          {/* Category Filter */}
          <div
            className={`border border-gray-300 pl-5 py-3 mt-6 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-black-700">
              {["Men", "Women", "Kids"].map((cat) => (
                <label key={cat} className="flex gap-2">
                  <input
                    className="w-3"
                    type="checkbox"
                    value={cat}
                    onChange={toggleCategory}
                    checked={category.includes(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>
          {/* SubCategory Filter */}
          <div
            className={`border border-gray-300 pl-5 py-3 my-5 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium">TYPE</p>
            <div className="flex flex-col gap-2 text-sm font-light text-black-700">
              {["Topwear", "Bottomwear", "Winterwear"].map((subcat) => (
                <label key={subcat} className="flex gap-2">
                  <input
                    className="w-3"
                    type="checkbox"
                    value={subcat}
                    onChange={toggleSubCategory}
                    checked={subcategory.includes(subcat)}
                  />
                  {subcat}
                </label>
              ))}
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex-1">
          <div className="flex justify-between gap-20 text-base sm:text-2xl mb-4">
            <h1>ALL COLLECTIONS</h1>
            {/* Product sort */}
            <select
              className="border-2 border-gray-300 text-sm px-2"
              onChange={handleSortChange}
              value={sortType}
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>
          {/* Render products */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterProducts.map((item) => (
              <div key={item._id}>
              <Link to={`/product/${item._id}`}>
              {item.image?.length > 0 ? (
                        <img
                          src={`http://localhost:3000/${item.image[0].replace(
                            /\\/g,
                            "/"
                          )}`}
                          alt={item.name}
                           className="h-80 w-72 object-cover rounded-t-xl"
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                  {/* <img
                    src={item.image[0]} // Assumes `item.image` is an array, displaying the first image
                    alt={item.name}
                    className="h-80 w-72 object-cover rounded-t-xl"
                  /> */}
                  <div className="px-4 py-3 w-72">
                    <span className="text-gray-400 mr-3 uppercase text-xs">
                      {item.subCategory}
                    </span>
                    <p className="text-lg font-bold text-black truncate block capitalize">
                      {item.name.slice(0,20)}
                    </p>
                    <div className="flex items-center">
                      <p className="text-lg font-semibold text-black cursor-auto my-3">
                        {`$${item.price}`}
                      </p>
                    </div>
                  </div>
             </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
