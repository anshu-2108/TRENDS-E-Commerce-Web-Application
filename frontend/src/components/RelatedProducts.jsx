import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";
import { FaArrowRight, FaTags } from "react-icons/fa";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter(
        (item) => subCategory === item.subCategory
      );
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  if (related.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div>
            {/* Decorative Badge */}
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-gray-400"></div>
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-200 rounded-full">
                <FaTags className="w-3 h-3 text-gray-600" />
                <span className="text-xs font-medium tracking-wider text-gray-600">
                  You May Also Like
                </span>
              </div>
              <div className="w-8 h-px bg-gray-400"></div>
            </div>

            {/* Title */}
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900">
              <span className="block font-normal mt-2">Related Products</span>
            </h2>

            {/* Category Info */}
            <p className="text-gray-600 text-sm mt-3">
              More from {category} • {subCategory}
            </p>
          </div>

          {/* View All Link */}
          <Link
            to={`/collection?category=${category}&type=${subCategory}`}
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            <span>View All {category}</span>
            <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {related.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image[0]}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>

        {/* Category Features */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Quality",
                description:
                  "All our products are crafted with attention to detail and durable materials",
              },
              {
                title: "Perfect Fit",
                description:
                  "Designed with comfort and versatility in mind for everyday wear",
              },
              {
                title: "Easy Care",
                description:
                  "Simple maintenance for long-lasting wear and timeless style",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-sm font-medium text-gray-900 mb-2">
                  {feature.title}
                </div>
                <p className="text-xs text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Explore More */}
        <div className="mt-12 text-center">
          <Link
            to="/collection"
            className="inline-flex items-center gap-3 px-8 py-3 border-2 border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            <span>Explore Full Collection</span>
            <FaArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="mt-16">
        <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>
      </div>
    </section>
  );
};

export default RelatedProducts;
