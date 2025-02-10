import { assets } from "@/assets/frontend_assets/assets";
import React from "react";
import { NavLink } from "react-router-dom";

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
          <img src={assets.logo} className="w-5 h-5" alt="" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>
        <NavLink
          to={"/list"}
          className={
            "flex items-center gap-3 border border-gray-300 px-3 py-2 rounded-1 justify-between"
          }
        >
          <img src={assets.logo} className="w-5 h-5" alt="" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          to={"/orders"}
          className={
            "flex items-center gap-3 border border-gray-300 px-3 py-2 rounded-1 justify-between"
          }
        >
          <img src={assets.logo} className="w-5 h-5" alt="" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
