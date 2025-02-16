import { assets } from "@/assets/frontend_assets/assets";
import React from "react";
import { NavLink } from "react-router-dom";
import add_item from "../../assets/add_img.png"
import list_item from "../../assets/list_item.png"
import order_item from "../../assets/order_icon.png"
const Sidebar = () => {
  return (
    <div className="w-[20%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          to={"/add"}
          className={
            "flex items-center gap-3 border border-gray-300 px-3 py-2 rounded-1 justify-between"
          }
        >
          <img src={add_item} className="w-5 h-5" alt="" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>
        <NavLink
          to={"/list"}
          className={
            "flex items-center gap-3 border border-gray-300 px-3 py-2 rounded-1 justify-between"
          }
        >
          <img src={list_item} className="w-5 h-5" alt="" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          to={"/orders"}
          className={
            "flex items-center gap-3 border border-gray-300 px-3 py-2 rounded-1 justify-between"
          }
        >
          <img src={order_item} className="w-5 h-5" alt="" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
