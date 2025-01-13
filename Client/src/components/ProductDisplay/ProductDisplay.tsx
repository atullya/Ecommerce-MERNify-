import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useProductContext } from "@/ContextAPI/ProductContext";
import starIcon from "../../assets/frontend_assets/star_icon.png";
import starDullIcon from "../../assets/frontend_assets/star_dull_icon.png";

const ProductDisplay = () => {
  const { products, addToCart, cart } = useProductContext(); // Destructure cart from context
  const { id } = useParams<{ id: string }>();
  const product = products.find((el) => el._id === id);

  useEffect(() => {
    console.log("Cart Contents:", cart);
  }, [cart]); // Logs whenever cart changes

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 px-4 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Section */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex flex-row lg:flex-col gap-2">
              {product.image.map((img, index) => (
                <img
                  key={index}
                  className="h-20 lg:h-24 w-20 lg:w-24 object-cover"
                  src={img}
                  alt={`${product.name} - ${index + 1}`}
                />
              ))}
            </div>
            <div>
              <img
                className="w-full lg:w-[320px] lg:h-[410px] object-cover"
                src={product.image[0]}
                alt={product.name}
              />
            </div>
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col lg:ml-16">
            <h1 className="text-gray-700 text-2xl lg:text-4xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-3 text-gray-800 text-lg">
              {[...Array(4)].map((_, i) => (
                <img key={i} src={starIcon} alt="Star" />
              ))}
              <img src={starDullIcon} alt="Star Dull" />
              <p>(111)</p>
            </div>
            <div className="flex gap-6 my-4 text-lg lg:text-xl font-bold">
              <div className="text-gray-500 line-through">${product.price}</div>
              <div className="text-red-500">${product.price}</div>
            </div>
            <p className="text-gray-600">{product.description}.</p>
            <div className="mt-5">
              <h2 className="text-gray-500 text-lg font-semibold">Select Size</h2>
              <div className="flex gap-3 mt-4">
                {product.sizes.map((size, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 bg-gray-50 border border-gray-200 rounded cursor-pointer text-sm lg:text-base"
                  >
                    {size}
                  </div>
                ))}
              </div>
              <button
                onClick={handleAddToCart}
                className="bg-red-500 text-white px-8 py-3 mt-6 rounded font-semibold w-full lg:w-auto"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;