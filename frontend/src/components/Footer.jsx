import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Link to="/" className="inline-block">
                  <h1 className="text-2xl font-light tracking-widest text-gray-900">
                    TRENDS
                  </h1>
                </Link>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed max-w-lg mb-8">
                A modern destination offering stylish, high-quality products
                designed for everyday living. We focus on timeless design,
                comfort, and value, bringing carefully curated collections to
                customers worldwide.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {[
                  {
                    icon: <FaInstagram className="w-4 h-4" />,
                    label: "Instagram",
                  },
                  {
                    icon: <FaFacebookF className="w-4 h-4" />,
                    label: "Facebook",
                  },
                  { icon: <FaTwitter className="w-4 h-4" />, label: "Twitter" },
                  {
                    icon: <FaPinterest className="w-4 h-4" />,
                    label: "Pinterest",
                  },
                  { icon: <FaYoutube className="w-4 h-4" />, label: "YouTube" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:border-gray-600 hover:text-gray-900 transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-6">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { to: "/", label: "Home" },
                  { to: "/collection", label: "Shop" },
                  { to: "/about", label: "About" },
                  { to: "/contact", label: "Contact" },
                  { to: "/orders", label: "Orders" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-gray-900 transition-all duration-300"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Legal */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-6">
                Information
              </h3>
              <ul className="space-y-3">
                {[
                  {
                    icon: <FaPhone className="w-3 h-3" />,
                    text: "+91-212-456-7890",
                  },
                  {
                    icon: <FaEnvelope className="w-3 h-3" />,
                    text: "contact@trends.com",
                  },
                  {
                    icon: <FaMapMarkerAlt className="w-3 h-3" />,
                    text: "Mumbai, India",
                  },
                ].map((info, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="text-gray-500 mt-0.5">{info.icon}</div>
                    <span className="text-sm text-gray-600">{info.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-xs text-gray-500">
                © {currentYear} TRENDS. All rights reserved.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>Secure Payment</span>
                <div className="h-4 w-px bg-gray-300"></div>
                <span>SSL Encrypted</span>
                <div className="h-4 w-px bg-gray-300"></div>
                <span>100% Secure</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {["Visa", "Mastercard", "PayPal", "Apple Pay"].map(
                (method, index) => (
                  <span key={index} className="text-xs text-gray-400">
                    {method}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Top Line */}
      <div className="h-px bg-linear-to-r from-transparent via-gray-300 to-transparent"></div>
    </footer>
  );
};

export default Footer;
