import React from "react";
import { assets } from "../assets/assets";
import {
  FaExchangeAlt,
  FaShieldAlt,
  FaHeadset,
  FaTruck,
  FaLeaf,
  FaCertificate,
} from "react-icons/fa";

const OurPolicy = () => {
  const policies = [
    {
      icon: <FaExchangeAlt className="w-6 h-6 text-gray-600" />,
      title: "Easy Exchange",
      description: "Hassle-free exchange within 7 days",
      color: "from-blue-50 to-blue-100/50",
      borderColor: "border-blue-100",
    },
    {
      icon: <FaShieldAlt className="w-6 h-6 text-gray-600" />,
      title: "Quality Guaranteed",
      description: "Premium materials, lasting durability",
      color: "from-emerald-50 to-emerald-100/50",
      borderColor: "border-emerald-100",
    },
    {
      icon: <FaHeadset className="w-6 h-6 text-gray-600" />,
      title: "24/7 Support",
      description: "Always here to help you",
      color: "from-gray-50 to-gray-100/50",
      borderColor: "border-gray-100",
    },
    {
      icon: <FaTruck className="w-6 h-6 text-gray-600" />,
      title: "Fast Shipping",
      description: "Free delivery on orders over $700",
      color: "from-amber-50 to-amber-100/50",
      borderColor: "border-amber-100",
    },
  ];

  return (
    <section className="py-4 lg:py-4 bg-linear-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-gray-300"></div>
            <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
              Our Commitment
            </span>
            <div className="w-12 h-px bg-gray-300"></div>
          </div>

          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
            <span className="block font-normal mt-1">
              Premium Service Promise
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-gray-600 text-sm lg:text-base">
            We believe great products deserve exceptional service. Our policies
            are designed with your satisfaction in mind.
          </p>
        </div>

        {/* Policies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {policies.map((policy, index) => (
            <div key={index} className="group relative">
              {/* Card Background */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${policy.color} border ${policy.borderColor} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>

              {/* Policy Card */}
              <div className="relative bg-white border border-gray-200 rounded-2xl p-6 lg:p-8 text-center group-hover:border-transparent group-hover:shadow-lg transition-all duration-300">
                {/* Icon Container */}
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 mb-6 rounded-full bg-linear-to-br ${policy.color} border ${policy.borderColor}`}
                >
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    {policy.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {policy.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {policy.description}
                </p>

                {/* Learn More Link */}
                <button className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors group/link">
                  <span className="inline-flex items-center gap-1">
                    Learn more
                    <span className="w-0 group-hover/link:w-3 h-px bg-gray-900 transition-all duration-300"></span>
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 lg:mt-20 pt-12 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                Trusted By Thousands
              </h3>
              <p className="text-gray-600 text-sm">
                Join our community of satisfied customers
              </p>
            </div>

            <div className="flex items-center gap-6 lg:gap-10">
              <div className="text-center">
                <div className="text-2xl font-light text-gray-900">4.8/5</div>
                <p className="text-xs text-gray-500 mt-1">Customer Rating</p>
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="text-center">
                <div className="text-2xl font-light text-gray-900">10k+</div>
                <p className="text-xs text-gray-500 mt-1">Happy Customers</p>
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="text-center">
                <div className="text-2xl font-light text-gray-900">98%</div>
                <p className="text-xs text-gray-500 mt-1">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sustainability Note */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-linear-to-r from-gray-50 to-white border border-gray-200 rounded-full">
            <FaLeaf className="w-3 h-3 text-gray-600" />
            <span className="text-xs font-medium text-gray-600">
              Sustainable packaging & eco-friendly materials
            </span>
            <FaCertificate className="w-3 h-3 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="mt-16 lg:mt-24">
        <div className="h-px bg-linear-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>
    </section>
  );
};

export default OurPolicy;
