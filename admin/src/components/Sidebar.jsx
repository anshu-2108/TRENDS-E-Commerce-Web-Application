import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[20%] min-h-screen border-r-4 border-gray-300 bg-linear-to-b from-gray-50 to-white shadow-inner">
      <div className="flex flex-col gap-6 pt-10 pl-6">
        {/* Add Items */}
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-4 border-2 ${
              isActive ? "border-r-0 border-black" : "border-gray-300"
            } border-r-0 px-4 py-3.5 rounded-l-lg font-bold text-gray-800 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 ${
              isActive ? "bg-black text-white hover:bg-gray-900" : ""
            }`
          }
          to="/add"
        >
          <img className="w-6 h-6" src={assets.add_icon} alt="" />
          <p className="text-lg hidden md:block font-semibold">ADD ITEMS</p>
        </NavLink>

        {/* List Items */}
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-4 border-2 ${
              isActive ? "border-r-0 border-black" : "border-gray-300"
            } border-r-0 px-4 py-3.5 rounded-l-lg font-bold text-gray-800 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 ${
              isActive ? "bg-black text-white hover:bg-gray-900" : ""
            }`
          }
          to="/list"
        >
          <img className="w-6 h-6" src={assets.order_icon} alt="" />
          <p className="text-lg hidden md:block font-semibold">LIST ITEMS</p>
        </NavLink>

        {/* Orders */}
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-4 border-2 ${
              isActive ? "border-r-0 border-black" : "border-gray-300"
            } border-r-0 px-4 py-3.5 rounded-l-lg font-bold text-gray-800 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 ${
              isActive ? "bg-black text-white hover:bg-gray-900" : ""
            }`
          }
          to="/orders"
        >
          <img className="w-6 h-6" src={assets.order_icon} alt="" />
          <p className="text-lg hidden md:block font-semibold">ORDERS</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
