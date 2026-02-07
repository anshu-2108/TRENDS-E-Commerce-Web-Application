import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  const handleClose = () => {
    setShowSearch(false);
    setSearch("");
  };

  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && showSearch && visible) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showSearch, visible]);

  if (!showSearch || !visible) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Transparent Overlay */}
      <div className="absolute inset-0 bg-transparent" onClick={handleClose} />

      {/* Search Bar - Positioned below navbar */}
      <div className="relative bg-white border-b border-gray-200 shadow-sm animate-slide-down">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative">
            <div
              className={`flex items-center bg-white border-2 rounded-lg transition-all duration-200 ${
                isFocused ? "border-gray-900" : "border-gray-300"
              }`}
            >
              {/* Search Icon */}
              <div className="pl-4 pr-3">
                <FaSearch
                  className={`w-4 h-4 transition-colors ${
                    isFocused ? "text-gray-900" : "text-gray-400"
                  }`}
                />
              </div>

              {/* Input Field */}
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="flex-1 py-4 pr-4 outline-none text-sm bg-transparent placeholder-gray-500"
                type="text"
                placeholder="Search products, collections, categories..."
                autoFocus
              />

              {/* Clear Button */}
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              )}

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors border-l border-gray-200"
              >
                Close
              </button>
            </div>

            {/* Search Suggestions */}
            {search && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden animate-fade-in">
                <div className="p-4">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Suggestions
                  </p>
                  <div className="space-y-2">
                    <button
                      className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                      onClick={() => setSearch("Men")}
                    >
                      Men's Collection
                    </button>
                    <button
                      className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                      onClick={() => setSearch("Women")}
                    >
                      Women's Collection
                    </button>
                    <button
                      className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                      onClick={() => setSearch("New Arrivals")}
                    >
                      New Arrivals
                    </button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                  <p className="text-xs text-gray-600">
                    Press{" "}
                    <kbd className="px-2 py-1 bg-gray-200 rounded text-xs font-mono">
                      ESC
                    </kbd>{" "}
                    to close
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Recent Searches (Optional) */}
          {!search && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs text-gray-500">Try:</span>
              {["Minimal", "Essentials", "Premium", "Basics"].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearch(term)}
                  className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
