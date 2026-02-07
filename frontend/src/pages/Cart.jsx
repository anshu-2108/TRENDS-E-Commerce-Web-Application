import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import CartTotal from "../components/CartTotal";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingBag,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const product = products.find((p) => p._id === itemId);
            if (product) {
              tempData.push({
                _id: itemId,
                size: size,
                quantity: cartItems[itemId][size],
                product: product,
              });
            }
          }
        }
      }
      setCartData(tempData);
    }
    setIsLoading(false);
  }, [cartItems, products]);

  const handleQuantityChange = (id, size, newQuantity) => {
    if (newQuantity < 1) {
      updateQuantity(id, size, 0);
    } else {
      updateQuantity(id, size, newQuantity);
    }
  };

  const handleIncrement = (id, size, currentQuantity) => {
    updateQuantity(id, size, currentQuantity + 1);
  };

  const handleDecrement = (id, size, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(id, size, currentQuantity - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading cart...</div>
      </div>
    );
  }

  if (cartData.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          {/* Empty Cart */}
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <FaShoppingBag className="w-8 h-8 text-gray-400" />
            </div>

            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-4">
              Your cart is empty
            </h2>

            <p className="text-gray-600 max-w-md mx-auto mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>

            <Link
              to="/collection"
              className="inline-flex items-center gap-3 px-8 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Start Shopping
              <FaArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Featured Products */}
          <div className="mt-16 pt-16 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider text-center mb-8">
              You might also like
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
                <div key={product._id} className="text-center">
                  <div className="aspect-square bg-gray-50 mb-4 rounded-lg overflow-hidden">
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {currency}
                    {product.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                <span className="block font-normal mt-2">Shopping Cart</span>
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {cartData.reduce((total, item) => total + item.quantity, 0)}{" "}
                  items
                </span>
                <div className="h-4 w-px bg-gray-300"></div>
                <span className="text-sm text-gray-600">
                  {cartData.length}{" "}
                  {cartData.length === 1 ? "product" : "products"}
                </span>
              </div>
            </div>

            <Link
              to="/collection"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Continue Shopping →
            </Link>
          </div>
        </div>

        {/* Cart Items */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Items List */}
          <div className="lg:col-span-2">
            <div className="border-t border-gray-200">
              {cartData.map((item, index) => (
                <div key={index} className="py-6 border-b border-gray-200">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="w-24 h-24 shrink-0">
                      <div className="w-full h-full bg-gray-50 rounded-lg overflow-hidden">
                        <img
                          src={item.product.image[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-base font-medium text-gray-900 mb-1">
                            {item.product.name}
                          </h3>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-sm text-gray-600">
                              {currency}
                              {item.product.price}
                            </span>
                            <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs font-medium text-gray-700 rounded">
                              Size: {item.size}
                            </span>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-gray-300 rounded">
                            <button
                              onClick={() =>
                                handleDecrement(
                                  item._id,
                                  item.size,
                                  item.quantity
                                )
                              }
                              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900"
                            >
                              <FaMinus className="w-3 h-3" />
                            </button>
                            <span className="w-10 h-10 flex items-center justify-center text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleIncrement(
                                  item._id,
                                  item.size,
                                  item.quantity
                                )
                              }
                              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900"
                            >
                              <FaPlus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.size, 0)
                            }
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          Subtotal:{" "}
                          <span className="font-medium text-gray-900">
                            {currency}
                            {item.product.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="sticky top-8">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">
                  Order Summary
                </h3>

                <CartTotal />

                <div className="space-y-4 mt-8">
                  <button
                    onClick={() => navigate("/place-order")}
                    className="w-full py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout
                    <FaArrowRight className="w-3 h-3" />
                  </button>

                  <Link
                    to="/collection"
                    className="block w-full py-3 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors text-center"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Additional Info */}
                <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Free shipping</span>
                    <span className="font-medium text-gray-900">
                      Over {currency}700
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Easy returns</span>
                    <span className="font-medium text-gray-900">7 days</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Secure checkout</span>
                    <span className="font-medium text-gray-900">
                      SSL encrypted
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 p-4 bg-white border border-gray-200 rounded-xl">
                <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
                  <span>✓ Secure Payment</span>
                  <div className="h-4 w-px bg-gray-300"></div>
                  <span>✓ Quality Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recently Viewed (Optional) */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-8">
            Recently Viewed
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <div key={product._id} className="group">
                <div className="aspect-square bg-gray-50 mb-4 rounded-lg overflow-hidden">
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {product.name}
                </p>
                <p className="text-sm text-gray-600">
                  {currency}
                  {product.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
