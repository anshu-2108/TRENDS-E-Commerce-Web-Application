import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaStar,
  FaRegStar,
  FaTag,
  FaLeaf,
  FaGem,
} from "react-icons/fa";

const LatestCollection = () => {
  const { products, currency } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <section className=" lg:py-1 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Visual Impact */}
        <div className="text-center mb-16 lg:mb-20">
          {/* Premium Badge */}
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900">
            {/* <span className="block">Fresh</span> */}
            <span className="block font-normal mt-2 mb-8">
              Fresh Collection
            </span>
            {/* Fresh Collection */}
          </h2>
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="w-20 h-px bg-linear-to-r from-transparent via-gray-400 to-transparent"></div>
            <div className="flex items-center gap-3 px-6 py-2 bg-linear-to-r from-gray-50 to-white border border-gray-200 rounded-full shadow-sm">
              <FaGem className="w-3 h-3 text-gray-600" />
              <span className="text-xs font-bold tracking-widest text-gray-700 uppercase">
                New Arrivals
              </span>
              <FaLeaf className="w-3 h-3 text-gray-600" />
            </div>
            <div className="w-20 h-px bg-linear-to-r from-transparent via-gray-400 to-transparent"></div>
          </div>

          {/* Decorative Subtitle */}
          <p className="max-w-2xl mx-auto text-gray-600 text-base lg:text-lg leading-relaxed mb-4">
            Just landed: The season's most anticipated pieces. Crafted for the
            modern individual who values quality and style.
          </p>

          {/* Rating Stars */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar key={star} className="w-4 h-4 text-yellow-500" />
            ))}
            <span className="text-sm font-medium text-gray-600 ml-2">
              4.9/5 Early Reviews
            </span>
          </div>
        </div>

        {/* Products Grid with Enhanced Layout */}
        <div className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.01)_25%,rgba(0,0,0,0.01)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.01)_75%)] bg-size-[30px_30px] opacity-10"></div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
            {latestProducts.map((item, index) => (
              <div
                key={index}
                className="transform hover:-translate-y-1 transition-transform duration-300"
              >
                <ProductItem
                  id={item._id}
                  image={item.image[0]}
                  name={item.name}
                  price={item.price}
                  category="new"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Featured Highlights */}
        <div className="mt-20 py-12 border-y border-gray-200">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-light text-gray-900 mb-2">24h</div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Exclusive Launch
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-gray-900 mb-2">100%</div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Premium Quality
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-gray-900 mb-2">Fast</div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Free Shipping
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-gray-900 mb-2">7d</div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Easy Returns
              </p>
            </div>
          </div>
        </div>

        {/* Premium CTA Section */}
        <div className="mt-16 lg:mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-6 p-8 lg:p-12 bg-linear-to-br from-gray-50 to-white border border-gray-200 rounded-2xl shadow-sm">
            <div>
              <h3 className="text-xl font-light text-gray-900 mb-2">
                Complete Your Collection
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Explore our full range of premium products
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/collection"
                className="group relative px-10 py-4 bg-gray-900 text-white text-sm font-bold tracking-wider hover:bg-gray-800 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  View Full Collection
                  <FaArrowRight className="w-3 h-3 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>

              <button className="px-10 py-4 border border-gray-900 text-gray-900 text-sm font-bold tracking-wider hover:bg-gray-900 hover:text-white transition-all duration-300">
                <span className="flex items-center justify-center gap-3">
                  <FaTag className="w-3 h-3" />
                  View Special Offers
                </span>
              </button>
            </div>

            <div className="pt-4 border-t border-gray-200 w-full">
              <p className="text-xs text-gray-500">
                Free express shipping on orders over {currency}150
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Bottom */}
        <div className="mt-20">
          <div className="flex items-center justify-center gap-8 opacity-60">
            <div className="w-12 h-px bg-linear-to-r from-transparent via-gray-400 to-transparent"></div>
            <span className="text-xs font-medium text-gray-500 tracking-widest">
              TRENDS
            </span>
            <div className="w-12 h-px bg-linear-to-r from-transparent via-gray-400 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Lines */}
      <div className="mt-20">
        <div className="h-px bg-linear-to-r from-transparent via-gray-300 to-transparent"></div>
        <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent mt-px"></div>
      </div>
    </section>
  );
};

export default LatestCollection;
