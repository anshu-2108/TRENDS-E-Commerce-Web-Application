import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl, setUser } =
    useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onsubmithandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Account created successfully!");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);

          // If you want to store user data in context
          if (response.data.user) {
            setUser(response.data.user);
          }

          toast.success("Logged in successfully!");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-gray-300"></div>
            <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
              {currentState === "Login" ? "Welcome Back" : "Join TRENDS"}
            </span>
            <div className="w-8 h-px bg-gray-300"></div>
          </div>

          <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
            {currentState === "Login" ? "Sign In" : "Create Account"}
          </h1>

          <p className="text-gray-600 text-sm">
            {currentState === "Login"
              ? "Enter your credentials to access your account"
              : "Create an account to start shopping"}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <form onSubmit={onsubmithandler} className="space-y-6">
            {/* Name Field - Only for Sign Up */}
            {currentState === "Sign Up" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none text-sm"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none text-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                {currentState === "Login" && (
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none text-sm"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-4 w-4" />
                  ) : (
                    <FaEye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {currentState === "Login"
                    ? "Signing in..."
                    : "Creating account..."}
                </>
              ) : (
                <>
                  {currentState === "Login" ? "Sign In" : "Create Account"}
                  <FaArrowRight className="w-3 h-3" />
                </>
              )}
            </button>

            {/* Terms for Sign Up */}
            {currentState === "Sign Up" && (
              <p className="text-xs text-gray-500 text-center">
                By creating an account, you agree to our{" "}
                <Link to="/terms" className="text-gray-900 hover:underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-gray-900 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            )}
          </form>

          {/* Divider */}
          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          {/* Toggle between Login/Sign Up */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {currentState === "Login"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setCurrentState(
                    currentState === "Login" ? "Sign Up" : "Login"
                  );
                  setName("");
                  setEmail("");
                  setPassword("");
                }}
                className="font-medium text-gray-900 hover:text-gray-700 transition-colors"
              >
                {currentState === "Login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full mx-auto">
                <FaCheckCircle className="w-3 h-3 text-gray-600" />
              </div>
              <p className="text-xs text-gray-600">Fast Checkout</p>
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full mx-auto">
                <FaCheckCircle className="w-3 h-3 text-gray-600" />
              </div>
              <p className="text-xs text-gray-600">Order Tracking</p>
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full mx-auto">
                <FaCheckCircle className="w-3 h-3 text-gray-600" />
              </div>
              <p className="text-xs text-gray-600">Exclusive Offers</p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
