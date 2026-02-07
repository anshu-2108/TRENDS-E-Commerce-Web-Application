import React from "react";
import { assets } from "../assets/assets";
import {
  FaArrowRight,
  FaTag,
  FaClock,
  FaShoppingBag,
  FaGem,
  FaStar,
} from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background Pattern - Very Subtle */}
      <div className="absolute inset-0 bg-linear-to-br from-gray-50/50 to-white" />

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-150 lg:min-h-175 py-12 lg:py-0">
          {/* Left Column - Content */}
          <div className="order-2 lg:order-1 relative z-10">
            <div className="max-w-lg mx-auto lg:mx-0">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-linear-to-r from-transparent to-gray-400"></div>
                <div className="flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm">
                  <FaGem className="w-3 h-3 text-gray-600" />
                  <span className="text-xs font-bold tracking-[0.2em] text-gray-700 uppercase">
                    Premium
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} className="w-2 h-2 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div className="w-12 h-px bg-linear-to-r from-gray-400 to-transparent"></div>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-6">
                <span className="block bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Essence of
                </span>
                <span className="block font-normal mt-4 text-gray-900">
                  Modern Style
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-xl">
                Where minimalism meets sophistication. Discover curated pieces
                designed for timeless elegance and everyday comfort.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="group relative px-10 py-4 bg-linear-to-r from-gray-900 to-black text-white text-sm font-medium hover:from-black hover:to-gray-900 transition-all duration-300 overflow-hidden rounded-lg shadow-lg hover:shadow-xl">
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Shop Collection
                    <FaArrowRight className="w-3 h-3 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button className="group px-10 py-4 border-2 border-gray-300 text-gray-700 text-sm font-medium hover:border-gray-900 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300 rounded-lg flex items-center justify-center gap-3">
                  <FaShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  View Lookbook
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                {[
                  {
                    icon: <FaTag className="w-5 h-5" />,
                    value: "50%",
                    label: "Discount",
                    color: "text-blue-600",
                  },
                  {
                    icon: <FaClock className="w-5 h-5" />,
                    value: "24h",
                    label: "Time Left",
                    color: "text-emerald-600",
                  },
                  {
                    value: "100+",
                    label: "New Items",
                    color: "text-purple-600",
                  },
                ].map((stat, index) => (
                  <div key={index} className="text-center group cursor-pointer">
                    <div
                      className={`flex items-center justify-center gap-2 mb-2 ${stat.color}`}
                    >
                      {stat.icon}
                      <span className="text-2xl lg:text-3xl font-light">
                        {stat.value}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider group-hover:text-gray-700 transition-colors">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-6">
                  Trusted By
                </p>
                <div className="flex items-center justify-between gap-8">
                  {["VOGUE", "ELLE", "GQ", "WWD"].map((brand) => (
                    <div key={brand} className="text-center">
                      <div className="text-sm font-light text-gray-700 opacity-70 hover:opacity-100 transition-opacity">
                        {brand}
                      </div>
                      <div className="w-8 h-0.5 bg-linear-to-r from-transparent via-gray-400 to-transparent mx-auto mt-2"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative h-100 lg:h-150 w-full overflow-hidden group rounded-3xl shadow-2xl">
              {/* Main Hero Image */}
              <img
                src={assets.hero_img}
                alt="Premium minimalist fashion collection"
                className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-white/5"></div>

              {/* Glowing Border Effect */}
              <div className="absolute -inset-0.5 bg-linear-to-r from-gray-900 to-gray-700 rounded-3xl opacity-0 group-hover:opacity-20 blur transition duration-1000 group-hover:duration-200"></div>

              {/* Floating Tag */}
              <div className="absolute top-8 right-8 animate-float">
                <div className="bg-white/95 backdrop-blur-md px-5 py-3 rounded-xl shadow-lg border border-white/50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-linear-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                    <p className="text-xs font-bold text-gray-900 tracking-wider">
                      Limited Edition
                    </p>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Spring 2026 Collection
                  </p>
                </div>
              </div>

              {/* Bottom Indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center gap-3 px-6 py-3 bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-white/40 animate-bounce-slow">
                  <div className="w-2 h-2 rounded-full bg-linear-to-r from-blue-500 to-purple-500 animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-900 tracking-wide">
                    Scroll to Explore
                  </span>
                  <div className="w-4 h-4 border-r-2 border-b-2 border-gray-900 transform rotate-45"></div>
                </div>
              </div>
            </div>

            {/* Side Decoration (Desktop only) */}
            <div className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2">
              <div className="flex flex-col items-center gap-8">
                <div className="w-0.5 h-24 bg-linear-to-b from-transparent via-gray-400 to-transparent"></div>
                <div className="text-sm font-bold text-gray-400 -rotate-90 whitespace-nowrap tracking-[0.3em]">
                  PREMIUM
                </div>
                <div className="w-0.5 h-24 bg-linear-to-b from-transparent via-gray-400 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block">
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs font-medium text-gray-400 tracking-[0.3em]">
              EXPLORE
            </span>
            <div className="w-0.5 h-16 bg-linear-to-b from-gray-400 to-transparent"></div>
            <div className="w-3 h-3 border-r-2 border-b-2 border-gray-400 transform rotate-45 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px bg-linear-to-r from-transparent via-gray-300 to-transparent"></div>
        <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent mt-px"></div>
      </div>

      {/* Add these animations to your global CSS or Tailwind config */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-5px);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
