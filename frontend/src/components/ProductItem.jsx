import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { FaEye, FaHeart, FaShoppingBag } from "react-icons/fa";

const ProductItem = ({ id, image, name, price, category }) => {
  const { currency } = useContext(ShopContext);
  const [isHovered, setIsHovered] = React.useState(false);

  // Function to format price with commas
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="group relative">
      <Link to={`/product/${id}`}>
        {/* Product Image Container */}
        <div
          className="relative overflow-hidden bg-gray-50 aspect-square mb-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Image */}
          <img
            className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
            src={image}
            alt={name}
            loading="lazy"
          />

          {/* Quick Actions Overlay */}
          <div
            className={`absolute inset-0 bg-black/5 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          ></div>

          {/* Quick View Button */}
          <button
            className={`absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm transition-all duration-300 transform ${
              isHovered
                ? "translate-x-0 opacity-100"
                : "translate-x-2 opacity-0"
            }`}
            onClick={(e) => {
              e.preventDefault();
              // Add quick view functionality here
            }}
          >
            <FaEye className="w-3 h-3 text-gray-700" />
          </button>

          {/* Add to Wishlist */}
          <button
            className={`absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm transition-all duration-300 transform ${
              isHovered
                ? "translate-x-0 opacity-100"
                : "translate-x-2 opacity-0"
            }`}
            onClick={(e) => {
              e.preventDefault();
              // Add to wishlist functionality here
            }}
          >
            <FaHeart className="w-3 h-3 text-gray-700" />
          </button>

          {/* Sale Badge (Conditional) */}
          {category === "sale" && (
            <div className="absolute top-0 left-0 bg-red-600 text-white px-3 py-1 text-xs font-medium tracking-wider">
              SALE
            </div>
          )}

          {/* New Badge */}
          {category === "new" && (
            <div className="absolute top-0 left-0 bg-gray-900 text-white px-3 py-1 text-xs font-medium tracking-wider">
              NEW
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          {/* Product Name */}
          <h3 className="text-sm font-medium text-gray-900 tracking-wide group-hover:text-gray-700 transition-colors line-clamp-2">
            {name}
          </h3>

          {/* Price Section */}
          <div className="flex items-center gap-2">
            <span className="text-base font-light text-gray-900 tracking-tight">
              {currency}
              {formatPrice(price)}
            </span>

            {/* Original Price (if on sale) */}
            {category === "sale" && (
              <span className="text-sm text-gray-400 line-through">
                {currency}
                {formatPrice(price * 1.5)}
              </span>
            )}
          </div>

          {/* Category Tag */}
          {category && category !== "sale" && category !== "new" && (
            <div className="inline-block">
              <span className="text-xs text-gray-500 font-medium px-2 py-1 border border-gray-200 rounded-full">
                {category}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Quick Add to Cart (Desktop only) */}
      <div
        className={`hidden lg:block absolute bottom-20 left-0 right-0 px-4 transition-all duration-300 transform ${
          isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <button
          className="w-full py-3 bg-gray-900 text-white text-sm font-medium tracking-wider hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Add to cart functionality here
          }}
        >
          <FaShoppingBag className="w-3 h-3" />
          ADD TO CART
        </button>
      </div>

      {/* Mobile Add to Cart Button */}
      <button
        className="lg:hidden w-full mt-4 py-2 border border-gray-900 text-gray-900 text-sm font-medium tracking-wider hover:bg-gray-900 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // Add to cart functionality here
        }}
      >
        <FaShoppingBag className="w-3 h-3" />
        ADD TO CART
      </button>
    </div>
  );
};

export default ProductItem;
