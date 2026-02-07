import React from "react";
import { FaSignOutAlt, FaCrown, FaStore } from "react-icons/fa";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-5 px-[4%] justify-between border-b-4 border-black bg-linear-to-r from-white to-gray-50 shadow-xl">
      {/* Logo Section with TRENDS text */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 bg-linear-to-r from-purple-700 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl">
            <FaCrown className="text-3xl text-white" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-linear-to-r from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center text-sm font-black border-3 border-white shadow-lg">
            ✨
          </div>
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-purple-800 to-pink-600">
            TRENDS
          </h1>
          <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-gray-700">
            <FaStore className="text-purple-600" />
            <span className="border-l-2 border-purple-300 pl-2">
              ADMIN PANEL
            </span>
          </div>
        </div>
      </div>

      {/* Logout Button - Made Thicker */}
      <button
        onClick={() => {
          if (window.confirm("Are you sure you want to logout?")) {
            setToken("");
          }
        }}
        className="bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-extrabold px-8 py-4 sm:px-10 sm:py-4 rounded-xl text-base sm:text-lg cursor-pointer transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-0.5 flex items-center gap-3"
      >
        <FaSignOutAlt className="text-xl" />
        <span className="tracking-wider">SIGN OUT</span>
      </button>
    </div>
  );
};

export default Navbar;
