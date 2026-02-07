import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaShoppingBag,
  FaUserCircle,
  FaHome,
  FaBox,
  FaInfoCircle,
  FaEnvelope,
  FaChevronDown,
} from "react-icons/fa";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const {
    setShowSearch,
    getcartcount,
    navigate,
    token,
    setToken,
    setCartItems,
    user,
  } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
    setIsProfileOpen(false);
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest(".profile-dropdown")) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isProfileOpen]);

  // Get user initials or first name
  const getUserDisplayName = () => {
    if (!user) return "User";

    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName.charAt(0)}.`;
    }

    if (user.firstName) {
      return user.firstName;
    }

    if (user.email) {
      return user.email.split("@")[0];
    }

    return "Hello";
  };

  const getUserInitials = () => {
    if (!user) return "U";

    if (user.firstName && user.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
    }

    if (user.firstName) {
      return user.firstName.charAt(0);
    }

    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }

    return "U";
  };

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sticky">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Minimalist Text */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-light tracking-widest text-gray-900">
              TRENDS
            </h1>
          </Link>

          {/* Desktop Navigation - Minimal */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-gray-900 border-b-2 border-gray-900 pb-1"
                      : "text-gray-600 hover:text-gray-900"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/collection"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-gray-900 border-b-2 border-gray-900 pb-1"
                      : "text-gray-600 hover:text-gray-900"
                  }`
                }
              >
                Products
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-gray-900 border-b-2 border-gray-900 pb-1"
                      : "text-gray-600 hover:text-gray-900"
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-gray-900 border-b-2 border-gray-900 pb-1"
                      : "text-gray-600 hover:text-gray-900"
                  }`
                }
              >
                Contact
              </NavLink>
            </nav>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FaSearch className="w-4 h-4" />
              </button>

              {/* Profile Dropdown */}
              <div className="relative profile-dropdown">
                {token ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center gap-2 p-2 text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      <div className="flex items-center justify-center w-8 h-8 bg-gray-900 text-white rounded-full text-sm font-medium">
                        {getUserInitials()}
                      </div>
                      <div className="hidden lg:flex flex-col items-start">
                        {/* <span className='text-xs text-gray-500'>Welcome back</span> */}
                        {/* <span className='text-sm font-medium'>{getUserDisplayName()}</span> */}
                        {/* <span className='text-sm font-medium'>Hello</span> */}
                      </div>
                      <FaChevronDown
                        className={`w-3 h-3 transition-transform ${
                          isProfileOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Profile Dropdown Menu */}
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-gray-100">
                          <div className="flex items-center gap-3">
                            {/* <div className='flex items-center justify-center w-10 h-10 bg-gray-900 text-white rounded-full text-sm font-medium'>
                                                            {getUserInitials()}
                                                        </div> */}
                            <div>
                              {/* <p className='text-sm font-medium text-gray-900'>
                                                                {getUserDisplayName()}
                                                            </p> */}
                              <p className="text-xs text-gray-500 truncate max-w-45">
                                {user?.email || "User Account"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          {/* <Link
                                                        to='/profile'
                                                        onClick={() => setIsProfileOpen(false)}
                                                        className='flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors'
                                                    >
                                                        <FaUserCircle className='w-4 h-4 text-gray-500' />
                                                        <span>My Profile</span>
                                                    </Link>
                                                     */}
                          <Link
                            to="/orders"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <FaShoppingBag className="w-4 h-4 text-gray-500" />
                            <span>My Orders</span>
                          </Link>

                          {/* <Link
                                                        to='/settings'
                                                        onClick={() => setIsProfileOpen(false)}
                                                        className='flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors'
                                                    >
                                                        <FaUser className='w-4 h-4 text-gray-500' />
                                                        <span>Account Settings</span>
                                                    </Link> */}
                        </div>

                        {/* Logout */}
                        <div className="border-t border-gray-100 pt-2">
                          <button
                            onClick={logout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <FaSignOutAlt className="w-4 h-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <FaUser className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Cart */}
              <Link to="/cart" className="relative">
                <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <FaShoppingCart className="w-4 h-4" />
                </button>
                {getcartcount() > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    {getcartcount()}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setVisible(true)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaBars className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-opacity ${
          visible ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/20"
          onClick={() => setVisible(false)}
        />

        {/* Sidebar */}
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-white shadow-xl transform transition-transform ${
            visible ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Menu</h2>
            <button
              onClick={() => setVisible(false)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* User Info in Mobile Menu */}
          {token && user && (
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-900 text-white rounded-full text-sm font-medium">
                  {getUserInitials()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {getUserDisplayName()}
                  </p>
                  <p className="text-xs text-gray-500 truncate max-w-45">
                    {user.email || "User Account"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="p-4">
            <nav className="space-y-2">
              {[
                { to: "/", icon: <FaHome />, label: "Home" },
                { to: "/collection", icon: <FaBox />, label: "Products" },
                { to: "/about", icon: <FaInfoCircle />, label: "About" },
                { to: "/contact", icon: <FaEnvelope />, label: "Contact" },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setVisible(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Account Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="space-y-2">
                {token ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setVisible(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                    >
                      <FaUserCircle className="w-4 h-4" />
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setVisible(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                    >
                      <FaShoppingBag className="w-4 h-4" />
                      My Orders
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setVisible(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                    >
                      <FaUser className="w-4 h-4" />
                      Account Settings
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setVisible(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/login");
                      setVisible(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md"
                  >
                    <FaUser className="w-4 h-4" />
                    Login / Signup
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
