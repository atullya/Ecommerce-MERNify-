import React from "react";
import Sidebar from "./AdminCompoenents/Sidebar";
import upload_area from "@/assets/upload_area.png";

const Add = () => {
  return (
    <div className="flex  h-screen">
      <Sidebar />
      <form className="flex flex-col gap-4 p-4 w-full items-start">
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img className="w-20" src={upload_area} alt="" />
            <input type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className="w-20" src={upload_area} alt="" />
            <input type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className="w-20" src={upload_area} alt="" />
            <input type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className="w-20" src={upload_area} alt="" />
            <input type="file" id="image4" hidden />
          </label>
        </div>

        <div>
          <p className="mb-2">Product Name</p>
          <input
            type="text"
            placeholder="Type Here "
            required
            className="w-full max-w-[500px] px-3 py-2"
          />
        </div>
        <div>
          <p className="mb-2">Product description</p>
          <textarea
            placeholder="Write Content Here "
            className="w-full max-w-[500px] px-3 py-2"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className="mb-2">Product Category</p>
            <select className="w-full px-3 py-2">
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className="mb-2">Sub Category</p>
            <select className="w-full px-3 py-2">
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <p className="mb-2">Product Price</p>
            <input
              placeholder="25"
              type="Number"
              min={0}
              className="w-full px-3 py-2 sm:w-[120px]"
            />
          </div>
        </div>
        <div>
          <p className="mb-2">Product sizes</p>
          <div className="flex gap-3">
            <div>
              <p className="bg-slate-200 px-3 py-1 cursor-pointer">S</p>
            </div>
            <div>
              <p className="bg-slate-200 px-3 py-1 cursor-pointer">M</p>
            </div>
            <div>
              <p className="bg-slate-200 px-3 py-1 cursor-pointer">L</p>
            </div>
            <div>
              <p className="bg-slate-200 px-3 py-1 cursor-pointer">XL</p>
            </div>
            <div>
              <p className="bg-slate-200 px-3 py-1 cursor-pointer">XXL</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <input type="checkbox" id="bestseller" />
          <label className="cursor-pointer" htmlFor="bestseller">
            Add to bestseller
          </label>
        </div>
        <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">ADD</button>
      </form>
    </div>
  );
};

export default Add;
