import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Bestseller = () => {
  const { products } = useContext(ShopContext);
  const [bestseller, setBestseller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestseller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <section className="py-16 lg:py-7 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-gray-300"></div>
            <span className="text-xs font-medium tracking-widest text-gray-500 uppercase">
              Curated Selection
            </span>
            <div className="w-12 h-px bg-gray-300"></div>
          </div>

          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
            <span className="block font-normal mt-1">Customer Favorites</span>
          </h2>

          <p className="max-w-2xl mx-auto text-gray-600 text-sm lg:text-base leading-relaxed">
            Highly rated essentials that combine quality craftsmanship with
            lasting comfort. Tried, tested, and trusted by our community.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 mb-12">
          {bestseller.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              image={item.image[0]}
              price={item.price}
              category="bestseller"
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="py-8 lg:py-12 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-light text-gray-900 mb-2">
                1k+
              </div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Orders
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-light text-gray-900 mb-2">
                4.8
              </div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Avg Rating
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-light text-gray-900 mb-2">
                98%
              </div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Satisfaction
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-light text-gray-900 mb-2">
                24h
              </div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Avg Delivery
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 lg:mt-16">
          <Link
            to="/collection"
            className="group inline-flex items-center gap-3 px-8 py-3 border border-gray-900 text-gray-900 text-sm font-medium tracking-wider hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            <span>View All Products</span>
            <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>

          <p className="text-xs text-gray-500 mt-4">
            Free shipping on orders over {useContext(ShopContext).currency}100
          </p>
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="mt-16 lg:mt-2">
        <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>
      </div>
    </section>
  );
};

export default Bestseller;
