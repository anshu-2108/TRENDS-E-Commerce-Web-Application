import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import {
  FaShoppingCart,
  FaTruck,
  FaCreditCard,
  FaPercent,
} from "react-icons/fa";

const CartTotal = () => {
  const { currency, delivery_fee, getcartamount } = useContext(ShopContext);

  const subtotal = getcartamount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;
  const hasFreeShipping = subtotal >= 100; // Free shipping over $100
  const shippingFee = hasFreeShipping ? 0 : delivery_fee;

  // Calculate potential savings
  const savings = hasFreeShipping ? delivery_fee : 0;
  const amountNeededForFreeShipping = Math.max(0, 100 - subtotal);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <FaShoppingCart className="w-4 h-4 text-gray-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Order Summary</h3>
        </div>
        <p className="text-sm text-gray-600">
          Review your items and shipping details
        </p>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-4 mb-6">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Subtotal</span>
            <span className="text-xs text-gray-500">
              ({currency}
              {subtotal})
            </span>
          </div>
          <span className="text-sm font-medium text-gray-900">
            {currency}
            {subtotal}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaTruck className="w-3 h-3 text-gray-400" />
            <span className="text-sm text-gray-600">Shipping</span>
          </div>
          {hasFreeShipping ? (
            <span className="text-sm font-medium text-green-600">FREE</span>
          ) : (
            <span className="text-sm font-medium text-gray-900">
              {currency}
              {shippingFee}
            </span>
          )}
        </div>

        {/* Savings */}
        {savings > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaPercent className="w-3 h-3 text-green-500" />
              <span className="text-sm text-green-600">Shipping Savings</span>
            </div>
            <span className="text-sm font-medium text-green-600">
              -{currency}
              {savings}
            </span>
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>

        {/* Total */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <FaCreditCard className="w-4 h-4 text-gray-600" />
            <span className="text-base font-medium text-gray-900">Total</span>
          </div>
          <div className="text-right">
            <div className="text-xl font-light text-gray-900">
              {currency}
              {total}
            </div>
            {subtotal > 0 && (
              <div className="text-xs text-gray-500">
                {hasFreeShipping
                  ? "Free shipping applied"
                  : "Including shipping"}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Free Shipping Progress */}
      {subtotal > 0 && !hasFreeShipping && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-blue-700">
              Add {currency}
              {amountNeededForFreeShipping} more for free shipping
            </span>
            <span className="text-xs text-blue-600">
              {Math.round((subtotal / 100) * 100)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-blue-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (subtotal / 100) * 100)}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Tax Notice */}
      <div className="mb-6">
        <p className="text-xs text-gray-500 text-center">
          Taxes calculated at checkout
        </p>
      </div>

      {/* Checkout Info */}
      {subtotal > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Items in cart</span>
              <span className="font-medium text-gray-900">
                {subtotal > 0 ? "Ready to ship" : "No items"}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Estimated delivery</span>
              <span className="font-medium text-gray-900">
                3-5 business days
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Easy returns</span>
              <span className="font-medium text-gray-900">30 days</span>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {subtotal === 0 && (
        <div className="text-center py-6">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <FaShoppingCart className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-sm text-gray-600">Your cart is empty</p>
        </div>
      )}
    </div>
  );
};

export default CartTotal;
