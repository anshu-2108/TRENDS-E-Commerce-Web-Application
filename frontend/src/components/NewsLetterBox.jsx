import React, { useState } from "react";
import { FaPaperPlane, FaCheck, FaEnvelope } from "react-icons/fa";

const NewsLetterBox = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail("");

      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }, 1000);
  };

  return (
    <section className="py-4 lg:py-4 bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        {isSubscribed && (
          <div className="mb-8 p-6 bg-linear-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200 rounded-2xl animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <FaCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  Welcome to TRENDS
                </h3>
                <p className="text-sm text-gray-600">
                  Thank you for subscribing! Check your email for a special
                  welcome offer.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Newsletter Content */}
        <div className="text-center">
          {/* Decorative Badge */}
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full">
              <FaEnvelope className="w-3 h-3 text-gray-600" />
              <span className="text-xs font-bold tracking-wider text-gray-600 uppercase">
                Newsletter
              </span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
            <span className="block font-normal mt-2">Stay Updated</span>
          </h2>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-gray-600 text-base lg:text-lg leading-relaxed mb-6">
            Join our community and be the first to discover new arrivals,
            exclusive offers, and style updates.
          </p>

          {/* Offer Badge */}
          <div className="inline-block mb-10">
            <div className="flex items-center gap-3 px-6 py-3 bg-linear-to-r from-gray-900 to-gray-800 text-white rounded-full">
              <span className="text-sm font-bold">20% OFF</span>
              <span className="text-xs">on your first purchase</span>
            </div>
          </div>
        </div>

        {/* Subscription Form */}
        <form onSubmit={onSubmitHandler} className="max-w-lg mx-auto">
          <div className="relative group">
            {/* Input Field */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-6 py-4 text-sm bg-white border-2 border-gray-300 rounded-full focus:border-gray-900 focus:outline-none transition-all duration-300 group-hover:border-gray-400"
              required
              disabled={isLoading || isSubscribed}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isSubscribed || !email}
              className={`absolute right-1 top-1 bottom-1 px-8 rounded-full flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                isLoading || isSubscribed || !email
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Subscribing...</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <FaPaperPlane className="w-3 h-3" />
                </>
              )}
            </button>
          </div>

          {/* Privacy Note */}
          <p className="text-center text-xs text-gray-500 mt-4">
            By subscribing, you agree to our Privacy Policy. Unsubscribe
            anytime.
          </p>
        </form>

        {/* Benefits List */}
        <div className="mt-12 pt-12 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider text-center mb-6">
            What You'll Get
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { text: "Early access to sales" },
              { text: "Exclusive member offers" },
              { text: "Weekly style inspiration" },
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                <span className="text-sm text-gray-600">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-light text-gray-900">50k+</div>
              <p className="text-xs text-gray-500 mt-1">Subscribers</p>
            </div>
            <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
            <div className="text-center">
              <div className="text-2xl font-light text-gray-900">1x</div>
              <p className="text-xs text-gray-500 mt-1">Weekly Updates</p>
            </div>
            <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
            <div className="text-center">
              <div className="text-2xl font-light text-gray-900">No Spam</div>
              <p className="text-xs text-gray-500 mt-1">Promise</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="mt-16">
        <div className="h-px bg-linear-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>
    </section>
  );
};

export default NewsLetterBox;
