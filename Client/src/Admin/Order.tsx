import React from "react";
import AdminNavbar from "./AdminCompoenents/AdminNavbar";
import Sidebar from "./AdminCompoenents/Sidebar";
import OrderHistory from "./OrderHistory";

const Order = () => {
  return (
    <div className="flex  bg-gray-100 ">
      <div>
        <AdminNavbar />

        <Sidebar />
      </div>
      <div className=" mt-20 w-full p-6 bg-gray-100 ml-[-900px]">
      <OrderHistory />
        </div>
    </div>
  );
};

export default Order;
